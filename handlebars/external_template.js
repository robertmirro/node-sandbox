(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['name'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"templateBodyItem\" style=\"display:none;\">\r\n    "
    + escapeExpression(((helper = helpers.templateBodyItem || (depth0 && depth0.templateBodyItem)),(typeof helper === functionType ? helper.call(depth0, {"name":"templateBodyItem","hash":{},"data":data}) : helper)))
    + "\r\n    <div class=\"templateBodyItemFooter\">"
    + escapeExpression(((helper = helpers.templateBodyFooter || (depth0 && depth0.templateBodyFooter)),(typeof helper === functionType ? helper.call(depth0, {"name":"templateBodyFooter","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>\r\n";
},"useData":true});
})();