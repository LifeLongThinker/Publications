import { TypedNode } from './Tree'

export interface NodeExporter {
    exportNotebook(notebook: Notebook): void;
    exportPage(page: Page): void;
    exportImageCell(cell: ImageCell): void;
    exportSourceCodeCell(cell: SourceCodeCell): void;
    exportTextCell(cell: TextCell): void;
}
export class Notebook extends TypedNode<Page> {
    constructor(public title: string) {
        super(null);
    }

    public get pages(): Page[] {
        return this.children;
    }

    public createPage(title: string): Page {
        return new Page(this, title);
    }

    public export(exporter: NodeExporter) {
        exporter.exportNotebook(this);
    }
}
export class Page extends TypedNode<Cell> {
    constructor(parent: Notebook, public title: string) {
        super(parent);
    }

    public get cells(): Cell[] {
        return this.children;
    }

    public addCell(cell: Cell) {
        cell.parent = this;
    }
    public export(exporter: NodeExporter) {
        exporter.exportPage(this);
    }
}
export abstract class Cell extends TypedNode<any> {
    constructor(parent?: Page) {
        super(parent);
    }
}
export class ImageCell extends Cell {
    constructor(public imageUrl: string) {
        super()
    }

    public export(exporter: NodeExporter) {
        exporter.exportImageCell(this)
    }
}
export class SourceCodeCell extends Cell { 
    constructor(public sourceCode: string) {
        super()
    }

    public export(exporter: NodeExporter) {
        exporter.exportSourceCodeCell(this)
    }
}
export class TextCell extends Cell {
    constructor(public text: string) {
        super()
    }

    public export(exporter: NodeExporter) {
        exporter.exportTextCell(this)
    }
}