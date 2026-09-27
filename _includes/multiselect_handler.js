// Multi-select handler
$("#subject-select").multiselect({
  includeSelectAllOption: true,
  numberDisplayed: 5,
  onChange: function (option, checked, select) {
    var csub = $(option).val();
    if (checked == true) {
      if (subs.indexOf(csub) < 0) subs.push(csub);
    } else {
      var idx = subs.indexOf(csub);
      if (idx >= 0) subs.splice(idx, 1);
    }
    update_filtering({ subs: subs, all_subs: all_subs, confs: confs });
  },
  onSelectAll: function (options) {
    subs = all_subs;
    update_filtering({ subs: subs, all_subs: all_subs, confs: confs });
  },
  onDeselectAll: function (options) {
    subs = [];
    update_filtering({ subs: subs, all_subs: all_subs, confs: confs });
  },
  buttonText: function (options, select) {
    if (options.length === 0) {
      return "None selected";
    } else {
      var labels = [];
      options.each(function () {
        if ($(this).attr("value") !== undefined) {
          labels.push($(this).attr("value"));
        } else {
          labels.push($(this).html());
        }
      });
      return labels.join(", ");
    }
  },
  buttonTitle: function (options, select) {
    return "";
  },
});

// Conference multi-select handler (an empty selection shows all conferences)
$("#conference-select").multiselect({
  includeSelectAllOption: false,
  enableCaseInsensitiveFiltering: true,
  maxHeight: 350,
  numberDisplayed: 3,
  nonSelectedText: "All conferences",
  onChange: function (option, checked, select) {
    var cconf = $(option).val();
    if (checked == true) {
      if (confs.indexOf(cconf) < 0) confs.push(cconf);
    } else {
      var idx = confs.indexOf(cconf);
      if (idx >= 0) confs.splice(idx, 1);
    }
    update_filtering({ subs: subs, all_subs: all_subs, confs: confs });
  },
  buttonText: function (options, select) {
    if (options.length === 0) {
      return "All conferences";
    }
    var labels = [];
    options.each(function () {
      labels.push($(this).attr("value"));
    });
    return labels.join(", ");
  },
  buttonTitle: function (options, select) {
    return "";
  },
});
