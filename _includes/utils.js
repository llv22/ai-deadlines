// Borrowed from https://github.com/moment/moment-timezone/issues/167
// Adds support for time zones 'UTC-12'..'UTC+12'
function addUtcTimeZones() {
  // Moment.js uses the IANA timezone database, which supports generic time zones like 'Etc/GMT+1'.
  // However, the signs for these time zones are inverted compared to ISO 8601.
  // For more details, see https://github.com/moment/moment-timezone/issues/167
  for (let offset = -12; offset <= 12; offset++) {
    const posixSign = offset <= 0 ? "+" : "-";
    const isoSign = offset >= 0 ? "+" : "-";
    const link = `Etc/GMT${posixSign}${Math.abs(
      offset
    )}|UTC${isoSign}${Math.abs(offset)}`;
    moment.tz.link(link);
  }
}

function update_filtering(data) {
  var page_url = "{{site.baseurl}}";
  var sel_confs = data.confs || [];
  store.set("{{site.domain}}-subs", data.subs);
  if (data.confs !== undefined) {
    store.set("{{site.domain}}-confs", data.confs);
  }

  // A conference is shown if it matches a selected subject AND, when any
  // conferences are selected, its name is one of them.
  $(".ConfItem").each(function () {
    var item = $(this);
    var sub_match = data.subs.some(function (s) {
      return item.hasClass(s + "-conf");
    });
    var conf_match =
      sel_confs.length == 0 || sel_confs.indexOf(item.attr("data-title")) >= 0;
    item.toggle(sub_match && conf_match);
  });

  var params = [];
  if (data.subs.length > 0) {
    params.push("sub=" + data.subs.join());
  }
  if (sel_confs.length > 0) {
    params.push("conf=" + sel_confs.map(encodeURIComponent).join());
  }
  if (params.length == 0) {
    window.history.pushState("", "", page_url);
  } else {
    window.history.pushState("", "", page_url + "/ai-deadlines?" + params.join("&"));
  }
}

function createCalendarFromObject(data) {
  return createCalendar({
    options: {
      class: "calendar-obj",

      // You can pass an ID. If you don't, one will be generated for you
      id: data.id,
    },
    data: {
      // Event title
      title: data.title,

      // Event start date
      start: data.date,

      // Event duration
      duration: 60,
    },
  });
}
