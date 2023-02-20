'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var setCachePeriod = require("~/cartridge/experience/utilities/setCachePeriod.js")

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.heading = content.heading;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID()).toString();
    
    if (content.description) {
        model.description = content.description;
    }

    // instruct 24 hours relative pagecache
    setCachePeriod.set24HoursCache();

    return new Template('experience/components/commerce_assets/mainBanner').render(model).text;
};
