const fs = require('fs')
const path = require('path')
const { Document, Packer, Paragraph, TextRun } = require('docx')

// Create document
const doc = new Document()

const sourceCode = fs.readFileSync(path.resolve('./dist/calshop/calshop-app.js'), 'utf8')

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
const docColumns = sourceCode.split('\n').map(line => {
  return new Paragraph({ text: line })
})

doc.addSection({
  properties: {},
  children: docColumns,
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("./dist/calshop-app.docx", buffer);
});
