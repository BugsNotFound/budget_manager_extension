$(function() {
    chrome.storage.sync.get("limit", function(budget) {
        $("#limit").val(budget.limit);
    });

    $("#saveLimit").click(function() {
        var limit = $("#limit").val();
        if (limit) {
            chrome.storage.sync.set({ "limit": limit }, function() {
                var notifOptions = {
                    type: "basic",
                    iconUrl: "icon48.png",
                    title: "Limit set!",
                    message: "Limit has been updated!"
                };

                chrome.notifications.create("limitUpdateNotif", notifOptions, function() {
                    close();
                });
            });
        }
    });

    $("#resetTotal").click(function() {
        chrome.storage.sync.set({ "total": 0 }, function() {
            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Total reset!",
                message: "Total has been reset to 0!"
            };

            chrome.notifications.create("totalReset", notifOptions, function() {
                close();
            });
        });
    });
});