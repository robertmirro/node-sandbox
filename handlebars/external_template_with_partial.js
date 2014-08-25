(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['name_with_partial'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n<!-- handlebars template - name -->\r\n<div class=\"templateBodyItem\" style=\"display:none;\">\r\n    ";
  stack1 = this.invokePartial(partials.templateBodyItemNumberPartial, 'templateBodyItemNumberPartial', depth0, undefined, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " \r\n    "
    + escapeExpression(((helper = helpers.templateBodyItem || (depth0 && depth0.templateBodyItem)),(typeof helper === functionType ? helper.call(depth0, {"name":"templateBodyItem","hash":{},"data":data}) : helper)))
    + "\r\n    <div class=\"templateBodyItemFooter\">"
    + escapeExpression(((helper = helpers.templateBodyFooter || (depth0 && depth0.templateBodyFooter)),(typeof helper === functionType ? helper.call(depth0, {"name":"templateBodyFooter","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
})();