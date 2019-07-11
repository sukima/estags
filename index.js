const fs = require('fs')
const babel = require('@babel/core')
const walk = require('babylon-walk')
const { stripIndent } = require('common-tags')
const {
  name: appName,
  version: appVersion,
  repository: { url: appRepoUrl }
} = require('./package.json')
const visitors = require('./lib/ast-visitors')

class TagsBuilder {

  constructor (rootPath) {
    this.rootPath = rootPath
    this.tags = []
  }

  processFile (filePath) {
    let content = fs.readFileSync(filePath, { encoding: 'utf8', cwd: this.rootPath })
    let ast = babel.parse(content, {
      sourceFilename: filePath,
      sourceType: 'unambiguous'
    })
    this.registerIdentifiers(ast)
  }

  registerIdentifiers (ast) {
    walk.recursive(ast, visitors, { tags: this.tags })
  }

  get header () {
    /* eslint-disable no-tabs */
    return stripIndent`
      !_TAG_FILE_FORMAT	2	/extended format/
      !_TAG_FILE_SORTED	1	/0=unsorted, 1=sorted, 2=foldcase/
      !_TAG_PROGRAM_AUTHOR	Devin Weaver	/suki@tritarget.org/
      !_TAG_PROGRAM_NAME	${appName}	//
      !_TAG_PROGRAM_URL	${appRepoUrl}	/github repository/
      !_TAG_PROGRAM_VERSION	${appVersion}	//
    `
    /* eslint-enable no-tabs */
  }

}

module.exports = TagsBuilder
