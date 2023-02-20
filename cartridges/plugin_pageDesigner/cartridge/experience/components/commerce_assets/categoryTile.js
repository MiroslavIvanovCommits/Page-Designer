"use strict";
/* global response */

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var URLUtils = require("dw/web/URLUtils");
var ImageTransformation = require("*/cartridge/experience/utilities/ImageTransformation.js");
var setCachePeriod = require("~/cartridge/experience/utilities/setCachePeriod.js")

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    model.textHeadline = content.textHeadline;

    var categoryObj = {};
    var category = content.category;

    categoryObj.ID = category.ID;
    categoryObj.compID = context.component.ID;
    categoryObj.name = category.displayName;

    if (content.description) {
        categoryObj.description = content.description;
    }

    if (content.categoryLinkName) {
        categoryObj.categoryLinkName = content.categoryLinkName;
        categoryObj.categoryLinkPosition = content.categoryLinkPosition;
    }

    model.image = ImageTransformation.getScaledImage(content.image);

    categoryObj.url =
        category.custom &&
        "alternativeUrl" in category.custom &&
        category.custom.alternativeUrl
            ? category.custom.alternativeUrl
            : URLUtils.url("Search-Show", "cgid", category.getID()).toString();

    model.category = categoryObj;

    // instruct 24 hours relative pagecache
    setCachePeriod.set24HoursCache();

    return new Template(
        "experience/components/commerce_assets/categoryTile"
    ).render(model).text;
};
