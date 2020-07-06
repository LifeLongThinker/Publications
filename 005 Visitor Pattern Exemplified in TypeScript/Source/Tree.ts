import { NodeExporter } from "./Notebook"

export abstract class Node {
    private _parent: Node;

    // CTOR
    constructor(parent?: Node) {
        this.parent = parent;
    }

    // PROPERTIES
    public get parent(): Node {
        return this._parent;
    }
    public set parent(value: Node) {
        if(this.parent)
        {
            this.parent.removeChild(this);
        }

        if(value)
        {
            value.addChild(this);
        }
    }
    public abstract get children(): Node[];

    // PUBLIC METHODS
    public abstract export(exporter: NodeExporter): void;

    // PROTECTED METHODS
    protected abstract removeChild(child: Node);
    protected abstract addChild(child: Node);
}
export abstract class TypedNode<TChildType extends Node> extends Node {
    // PRIVATE MEMBERS
    private _children: TChildType[] = []

    // CTOR
    constructor(parent?: Node) {
        super(parent);
    }
    
    // PROPERTIES
    public get children(): TChildType[] {
        return this._children;
    }

    // PROTECTED METHODS
    protected removeChild(child: TChildType) {
        const index = this.getIndexOfChild(child);
        if(index < 0)
        {
            return;
        }

        this._children.splice(index, 1);
    }
    protected addChild(item: TChildType) {
        const index = this.getIndexOfChild(item);
        if(index >= 0)
        {
            return;
        }

        this._children.push(item);
    }
    private getIndexOfChild(child: TChildType) {
        return this._children.indexOf(child, 0);
    }
}