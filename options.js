$(function() {
    chrome.storage.sync.get("limit", function(budget) {
        $("#limit").val(budget.limit);
    });

    $("#saveLimit").click(function() {
        var limit = $("#limit").val();
        if (limit) {
            chrome.storage.sync.set({ "limit": limit }, function() {
                alert("Limit set!");
                close();
            });
        }
    });

    $("#resetTotal").click(function() {
        chrome.storage.sync.set({ "total": 0 });
        alert("Total spent value set to 0!");
        close();
    });
});