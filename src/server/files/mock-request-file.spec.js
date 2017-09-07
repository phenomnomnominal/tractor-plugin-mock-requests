// /* global describe:true, it:true */
//
// // Utilities:
// import chai from 'chai';
// import dirtyChai from 'dirty-chai';
// import path from 'path';
// import Promise from 'bluebird';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
//
// // Test setup:
// const expect = chai.expect;
// chai.use(dirtyChai);
// chai.use(sinonChai);
//
// // Dependencies:
// import { JavaScriptFile } from './JavaScriptFile';
// import { StepDefinitionFile } from './StepDefinitionFile';
// import { TractorError } from 'tractor-error-handler';
// import { File, FileStructure } from 'tractor-file-structure';
//
// // Under test:
// import { MockRequestFile } from './mock-request-file';
//
// describe('tractor-plugin-mock-requests - MockRequestFile:', () => {
//     describe('MockRequestFile constructor:', () => {
//         it('should create a new MockRequestFile', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file');
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             expect(file).to.be.an.instanceof(MockRequestFile);
//         });
//
//         it('should inherit from File', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file');
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             expect(file).to.be.an.instanceof(File);
//         });
//     });
//
//     describe('MockRequestFile.delete:', () => {
//         it('should delete the file from disk', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//
//             sinon.stub(File.prototype, 'delete').returns(Promise.resolve());
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.delete()
//             .then(() => {
//                 expect(File.prototype.delete).to.have.been.called();
//             })
//             .finally(() => {
//                 File.prototype.delete.restore();
//             });
//         });
//
//         it('should delete the list of references to the file', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             fileStructure.references[filePath] = [];
//
//             sinon.stub(File.prototype, 'delete').returns(Promise.resolve());
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.delete()
//             .then(() => {
//                 expect(fileStructure.references[filePath]).to.be.undefined();
//             })
//             .finally(() => {
//                 File.prototype.delete.restore();
//             });
//         });
//
//         it('should throw an error if the mock data is referenced by other files', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             fileStructure.references[filePath] = ['fake reference'];
//
//             sinon.stub(File.prototype, 'delete').returns(Promise.resolve());
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.delete()
//             .catch(e => {
//                 expect(e).to.deep.equal(new TractorError(`Cannot delete ${file.path} as it is referenced by another file.`));
//             })
//             .finally(() => {
//                 File.prototype.delete.restore();
//             });
//         });
//
//         it('should not throw an error if `isMove` is true', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             fileStructure.references[filePath] = [];
//
//             sinon.stub(File.prototype, 'delete').returns(Promise.resolve());
//             sinon.spy(Promise, 'reject');
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.delete({ isMove: true })
//             .then(() => {
//                 expect(Promise.reject).to.not.have.been.called();
//             })
//             .finally(() => {
//                 File.prototype.delete.restore();
//                 Promise.reject.restore();
//             });
//         });
//     });
//
//     describe('MockRequestFile.save:', () => {
//         it('should save the file to disk', () => {
//             let content = '';
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//
//             sinon.stub(File.prototype, 'save').returns(Promise.resolve());
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.save(content)
//             .then(() => {
//                 expect(File.prototype.save).to.have.been.called();
//             })
//             .finally(() => {
//                 File.prototype.save.restore();
//             });
//         });
//     });
//
//     describe('MockRequestFile.delete:', () => {
//         it('should delete the file from disk', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//
//             sinon.stub(File.prototype, 'delete').returns(Promise.resolve());
//
//             let file = new MockRequestFile(filePath, fileStructure);
//
//             return file.delete()
//             .then(() => {
//                 expect(File.prototype.delete).to.have.been.called();
//             })
//             .finally(() => {
//                 File.prototype.delete.restore();
//             });
//         });
//     });
//
//     describe('MockRequestFile.move:', () => {
//         it('should move the file', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(File.prototype, 'save').returns(Promise.resolve());
//             sinon.stub(Promise, 'map').returns(Promise.resolve());
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .then(() => {
//                 expect(File.prototype.move).to.have.been.calledWith(update, options);
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 File.prototype.save.restore();
//                 Promise.map.restore();
//             });
//         });
//
//         it('should update the class name of the mock data in files that reference it', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//             let referenceFilePath = path.join(path.sep, 'file-structure', 'directory', 'reference file.step.js');
//             let referenceFile = new StepDefinitionFile(referenceFilePath, fileStructure);
//             fileStructure.references[filePath] = [referenceFile.path];
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(JavaScriptFile.prototype, 'transformIdentifiers');
//             sinon.stub(JavaScriptFile.prototype, 'transformMetadata');
//             sinon.stub(StepDefinitionFile.prototype, 'save').returns(Promise.resolve());
//             sinon.stub(StepDefinitionFile.prototype, 'transformRequirePaths');
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .then(() => {
//                 expect(referenceFile.transformIdentifiers).to.have.been.calledWith('File', 'NewFile', 'VariableDeclarator');
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 JavaScriptFile.prototype.transformIdentifiers.restore();
//                 JavaScriptFile.prototype.transformMetadata.restore();
//                 StepDefinitionFile.prototype.save.restore();
//                 StepDefinitionFile.prototype.transformRequirePaths.restore();
//             });
//         });
//
//         it('should update the instance name of the mock data in files that reference it', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//             let referenceFilePath = path.join(path.sep, 'file-structure', 'directory', 'reference file.step.js');
//             let referenceFile = new StepDefinitionFile(referenceFilePath, fileStructure);
//             fileStructure.references[filePath] = [referenceFile.path];
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(JavaScriptFile.prototype, 'transformIdentifiers');
//             sinon.stub(JavaScriptFile.prototype, 'transformMetadata');
//             sinon.stub(StepDefinitionFile.prototype, 'save').returns(Promise.resolve());
//             sinon.stub(StepDefinitionFile.prototype, 'transformRequirePaths');
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .then(() => {
//                 expect(referenceFile.transformIdentifiers).to.have.been.calledWith('file', 'newFile', 'VariableDeclarator');
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 JavaScriptFile.prototype.transformIdentifiers.restore();
//                 JavaScriptFile.prototype.transformMetadata.restore();
//                 StepDefinitionFile.prototype.save.restore();
//                 StepDefinitionFile.prototype.transformRequirePaths.restore();
//             });
//         });
//
//         it('should update the metadata of the mock data in files that reference it', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//             let referenceFilePath = path.join(path.sep, 'file-structure', 'directory', 'reference file.step.js');
//             let referenceFile = new StepDefinitionFile(referenceFilePath, fileStructure);
//             fileStructure.references[filePath] = [referenceFile.path];
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(JavaScriptFile.prototype, 'transformIdentifiers');
//             sinon.stub(JavaScriptFile.prototype, 'transformMetadata');
//             sinon.stub(StepDefinitionFile.prototype, 'save').returns(Promise.resolve());
//             sinon.stub(StepDefinitionFile.prototype, 'transformRequirePaths');
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .then(() => {
//                 expect(referenceFile.transformMetadata).to.have.been.calledWith('file', 'new file', 'mock-request');
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 JavaScriptFile.prototype.transformIdentifiers.restore();
//                 JavaScriptFile.prototype.transformMetadata.restore();
//                 StepDefinitionFile.prototype.save.restore();
//                 StepDefinitionFile.prototype.transformRequirePaths.restore();
//             });
//         });
//
//         it('should update the require path to the mock data in files that reference it', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//             let referenceFilePath = path.join(path.sep, 'file-structure', 'directory', 'reference file.step.js');
//             let referenceFile = new StepDefinitionFile(referenceFilePath, fileStructure);
//             fileStructure.references[filePath] = [referenceFile.path];
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(JavaScriptFile.prototype, 'transformIdentifiers');
//             sinon.stub(JavaScriptFile.prototype, 'transformMetadata');
//             sinon.stub(StepDefinitionFile.prototype, 'save').returns(Promise.resolve());
//             sinon.stub(StepDefinitionFile.prototype, 'transformRequirePaths');
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .then(() => {
//                 expect(referenceFile.transformRequirePaths).to.have.been.calledWith({
//                     fromPath: referenceFilePath,
//                     oldToPath: filePath,
//                     newToPath: newFilePath
//                 });
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 JavaScriptFile.prototype.transformIdentifiers.restore();
//                 JavaScriptFile.prototype.transformMetadata.restore();
//                 StepDefinitionFile.prototype.save.restore();
//                 StepDefinitionFile.prototype.transformRequirePaths.restore();
//             });
//         });
//
//         it('should throw if updating references fails', () => {
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//             let file = new MockRequestFile(filePath, fileStructure);
//             let newFilePath = path.join(path.sep, 'file-structure', 'directory', 'new file.mock.json');
//             let newFile = new MockRequestFile(newFilePath, fileStructure);
//
//             sinon.stub(File.prototype, 'move').returns(Promise.resolve(newFile));
//             sinon.stub(JavaScriptFile.prototype, 'transformIdentifiers');
//             sinon.stub(JavaScriptFile.prototype, 'transformMetadata');
//             sinon.stub(Promise, 'map').returns(Promise.reject());
//
//             let update = {};
//             let options = {};
//
//             return file.move(update, options)
//             .catch(e => {
//                 expect(e).to.deep.equal(new TractorError(`Could not update references after moving ${filePath}.`));
//             })
//             .finally(() => {
//                 File.prototype.move.restore();
//                 JavaScriptFile.prototype.transformIdentifiers.restore();
//                 JavaScriptFile.prototype.transformMetadata.restore();
//                 Promise.map.restore();
//             });
//         });
//     });
//
//     describe('MockRequestFile.serialise:', () => {
//         it(`should include the file's content`, () => {
//             let content = 'content';
//             let fileStructure = new FileStructure(path.join(path.sep, 'file-structure'));
//             let filePath = path.join(path.sep, 'file-structure', 'directory', 'file.mock.json');
//
//             sinon.stub(File.prototype, 'serialise').returns({});
//
//             let file = new MockRequestFile(filePath, fileStructure);
//             file.content = content;
//
//             file.serialise();
//
//             expect(file.content).to.equal(content);
//
//             File.prototype.serialise.restore();
//         });
//     });
// });
