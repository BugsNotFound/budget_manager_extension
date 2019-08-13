var contextMenuItem = {
    "id": "SpendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    if (clickedData.menuItemId == "SpendMoney" && clickedData.selectionText) {
        if (isInt(clickedData.selectionText)) {
            chrome.storage.sync.get(["total", "limit"], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }



                newTotal += parseInt((clickedData.selectionText).split(',').join(''));

                chrome.storage.sync.set({ "total": newTotal }, function() {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Uh oh! Looks like you've reached your limit"
                        };

                        chrome.notifications.create("limitNotif", notifOptions);
                    }
                });
            });
        }
    }
});