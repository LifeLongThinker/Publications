import { NodeExporter, Notebook, Page, TextCell, SourceCodeCell, ImageCell } from "./Notebook"

export class HtmlExporter implements NodeExporter {
    private _html: string = "";

    public get html(): string {
        return this._html;
    }

    public exportNotebook(notebook: Notebook) {
        this.appendHtmlLine('<main class="notebook">');
        this.appendHtmlLine(`<h1>${notebook.title}</h1>`);

        for(const page of notebook.pages)
        {
            page.export(this);
        }
        
        this.appendHtmlLine("</main>");
    }
    public exportPage(page: Page) {
        this.appendHtmlLine('<section class="page">');
        this.appendHtmlLine(`<h2>${page.title}</h2>`);

        for(const cell of page.cells)
        {
            cell.export(this);
        }

        this.appendHtmlLine("</section>");
    }
    public exportTextCell(cell: TextCell) {
        this.appendHtmlLine(`<p>${cell.text}</p>`);
    }
    public exportSourceCodeCell(cell: SourceCodeCell) {
        this.appendHtmlLine(`<code>${cell.sourceCode}</code>`);
    }
    public exportImageCell(cell: ImageCell) {
        this.appendHtmlLine(`<img src="${cell.imageUrl}">`);
    }

    private appendHtmlLine(html: string) {
        this._html += '\n' + html;
    }
}

export class XmlExporter implements NodeExporter {
    private _xml: string = `<?xml version="1.0" encoding="UTF-8"?>`;

    public get xml(): string {
        return this._xml;
    }

    public exportNotebook(notebook: Notebook) {
        this.appendXmlLine(`<notebook title="${notebook.title}">`);
        
        for(const page of notebook.pages)
        {
            page.export(this);
        }
        
        this.appendXmlLine("</notebook>");
    }
    public exportPage(page: Page) {
        this.appendXmlLine(`<page title="${page.title}">`);
        
        for(const cell of page.cells)
        {
            cell.export(this);
        }

        this.appendXmlLine("</page>");
    }
    public exportTextCell(cell: TextCell) {
        this.appendXmlLine(`<text>${cell.text}</text>`);
    }
    public exportSourceCodeCell(cell: SourceCodeCell) {
        this.appendXmlLine(`<code>${cell.sourceCode}</code>`);
    }
    public exportImageCell(cell: ImageCell) {
        this.appendXmlLine(`<image url="${cell.imageUrl}" />`);
    }

    private appendXmlLine(xml: string) {
        this._xml += '\n' + xml;
    }
}