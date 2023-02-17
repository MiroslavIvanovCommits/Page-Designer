'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.3 Row x 1 Col (Mobile) 1 Row x 3 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    var content = context.content;
    
    var col1Order = content.column1Order;
    var col2Order = content.column2Order;
    var col3Order = content.column3Order;
    

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.regions.column1.setClassName("region col-12 col-md-4 order-" + col1Order);
    model.regions.column2.setClassName("region col-12 col-md-4 order-" + col2Order);
    model.regions.column3.setClassName("region col-12 col-md-4 order-" + col3Order);

    // instruct 24 hours relative pagecache
    var expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);

    return new Template('experience/components/commerce_layouts/mobileAndTabletGrid3r1c').render(model).text;
};
