/*{"name":"tractor-mock-requests","elements":[{"name":"name"},{"name":"name input"},{"name":"name validation"},{"name":"save button"},{"name":"confirm save dialog"},{"name":"new file button"}],"actions":[{"name":"create and save mock data file","parameters":[{"name":"name"}]},{"name":"save mock data file","parameters":[]},{"name":"get name","parameters":[]},{"name":"get validation","parameters":[]}],"version":"0.5.0"}*/
module.exports = function () {
    var TractorConfirmDialog = require('../../../node_modules/@tractor/ui/dist/page-objects/Core/Components/ConfirmDialog/tractor-confirm-dialog.po.js');
    var TractorMockRequests = function TractorMockRequests(parent) {
        var find = parent ? parent.element.bind(parent) : element;
        this.name = find(by.css('tractor-mock-requests .file-options__name'));
        this.nameInput = find(by.css('tractor-mock-requests form tractor-text-input[label="Name"] input'));
        this.nameValidation = find(by.css('tractor-mock-requests form tractor-text-input[label="Name"] ng-message'));
        this.saveButton = find(by.css('tractor-submit[action="Save mock data file"] button'));
        this.confirmSaveDialog = new TractorConfirmDialog(find(by.css('tractor-confirm-dialog')));
        this.newFileButton = find(by.css('tractor-action[action="New file"] button'));
    };
    TractorMockRequests.prototype.createAndSaveMockDataFile = function (name) {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.newFileButton.click();
        });
        result = result.then(function () {
            return self.nameInput.sendKeys(name);
        });
        result = result.then(function () {
            return self.saveButton.click();
        });
        return result;
    };
    TractorMockRequests.prototype.saveMockDataFile = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.saveButton.click();
        });
        result = result.then(function () {
            return self.saveButton.click();
        });
        return result;
    };
    TractorMockRequests.prototype.getName = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.name.getText();
        });
        return result;
    };
    TractorMockRequests.prototype.getValidation = function () {
        var self = this;
        var result = Promise.resolve();
        result = result.then(function () {
            return self.nameValidation.getText();
        });
        return result;
    };
    return TractorMockRequests;
}();