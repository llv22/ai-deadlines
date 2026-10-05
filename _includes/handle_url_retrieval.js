// Get subjects from URL/Cache
var url = new URL(window.location);
subs = url.searchParams.get("sub");
if (subs == undefined) {
  subs = store.get("{{site.domain}}-subs");
} else {
  subs = subs.toUpperCase().split(",");
}

// Apply selections
if (subs == undefined) {
  subs = all_subs;
}
$("#subject-select").multiselect("select", subs);

// Get conferences from URL/Cache (only on pages with a conference filter)
if ($("#conference-select").length) {
  // The conference selection comes only from the URL, so a plain visit
  // always shows every conference. Clear the selection older versions saved.
  store.remove("{{site.domain}}-confs");
  var conf_param = url.searchParams.get("conf");
  if (conf_param != undefined) {
    confs = conf_param.split(",").filter(function (c) { return c.length > 0; });
  } else {
    confs = [];
  }
  // Drop names that are no longer in the conference list
  var all_confs = $("#conference-select option").map(function () {
    return $(this).val();
  }).get();
  confs = confs.filter(function (c) { return all_confs.indexOf(c) >= 0; });
  $("#conference-select").multiselect("select", confs);
}
update_filtering({ subs: subs, all_subs: all_subs, confs: confs });
