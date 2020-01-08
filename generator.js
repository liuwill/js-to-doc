const fs = require('fs')
const path = require('path')

const { Document, Packer, Paragraph, TextRun } = require('docx')

function generateDoc(srouce, target) {
  // Create document
  const doc = new Document()

  const sourceCode = fs.readFileSync(srouce, 'utf8')

  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  const docColumns = sourceCode.split('\n').map(line => {
    return new Paragraph({ text: line })
  })

  doc.addSection({
    properties: {},
    children: docColumns,
  })

  // Used to export the file into a .docx file
  return new Promise((resolve, reject) => {
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(target, buffer)
      resolve(target)
    })
  })
}

module.exports = {
  generateDoc,
}
