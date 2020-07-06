import { Notebook, ImageCell, SourceCodeCell, TextCell } from "./Notebook"
import { HtmlExporter, XmlExporter } from "./Export"

// create notebook
const notebook = new Notebook("My Coding Ideas");
const page1 = notebook.createPage("First Page");
page1.addCell(new ImageCell('https://www.my-awesome-website.abc/logo.png'));
page1.addCell(new SourceCodeCell("alert('Hello, World!');"));
page1.addCell(new TextCell("Hello, World!"));
const page2 = notebook.createPage("Second Page");
page2.addCell(new TextCell("Bye, World!"));

// export to HTML
const htmlExporter = new HtmlExporter();
notebook.export(htmlExporter);
console.log(htmlExporter.html);

// export to XML
const xmlExporter = new XmlExporter();
notebook.export(xmlExporter);
console.log(xmlExporter.xml);