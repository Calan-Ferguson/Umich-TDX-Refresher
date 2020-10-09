var iframe;
var elmnt;
var countdown = 5 * 6;
var countdown = 10 * 1000; //5*60*100;
var count_of_tabs_open = 1;
var set_event_listeners_on_start_was_called = false;
//these are the IDs of every TDX tabs the technician could potentially have open
var first_degree_iframe_ids = ["appDesktop", "ai_62", "appDownloads", "assetai_32", "assetai_33", "ai_31", "appMyWork", "addPeople"]

//FIXME: the My Work tab is slightly different so the click needs to be in a differeny position

var addDesktop_timer_on = true;
var ai_62_timer_on = false;
var appDownloads_timer_on = false;
var assetai_32_timer_on = false;
var assetai_33_timer_on = false;
var ai_31_timer_on = false;
var appMyWork_timer_on = false;
var addPeople_timer_on = false;


//for debugging only until the functions to turn the timers on and off are implemented
/*
var addDesktop_timer_on = true;
var ai_62_timer_on = true;
var appDownloads_timer_on = true;
var assetai_32_timer_on = true;
var assetai_33_timer_on = true;
var ai_31_timer_on = true;
var appMyWork_timer_on = true;
var addPeople_timer_on = true;
*/
//above is for debugging only

function refresh_Desktop_Tab() {
    iframe = document.getElementById("appDesktop");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed Desktop's desktop data");
}

//refresh TDX Hub
function refresh_ai_62_Tab() {
    iframe = document.getElementById("ai_62");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed TDX Hub's desktop data");
}

function refresh_appDownloads_Tab() {
    iframe = document.getElementById("appDownloads");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed Downloads' desktop data");
}

function refresh_ai_32_Tab() {
    iframe = document.getElementById("assetai_32");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed ITS EUC Assets/CIs' desktop data");
} 

function refresh_ai_33_Tab() {
    iframe = document.getElementById("assetai_33");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed ITS INF Assets/CIs' desktop data");
}

function refresh_ai_31_Tab() {
    iframe = document.getElementById("ai_31");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed ITS Tickets desktop data");
}

function refresh_appMyWork_Tab() {
    iframe = document.getElementById("appMyWork");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed My Work desktop data");
}

function refresh_addPeople_Tab() {
    iframe = document.getElementById("appPeople");
    //elmnt = iframe.contentWindow.document.getElementById('btnRefresh');
    iframe.contentWindow.document.elementFromPoint(20, 20).click();
    console.log("refreshed People desktop data");
}

function user_clicked_tab_in_header(){
    console.log("open");
    console.log(this);

    var tab_text = this.text;

    if(tab_text == "Desktop"){
        setTimeout(refresh_Desktop_Tab, 5000);
    }
    else if(tab_text == ">TDX Hub"){
        setTimeout(refresh_ai_62_Tab, 5000);
    }
    //FIXME: Downloads needs another way to access it because it doesnt have a title value
    else if(tab_text == ""){
        setTimeout(refresh_appDownloads_Tab, 5000);
    }
    else if(tab_text == "ITS EUC Assets/CIs"){
        setTimeout(refresh_ai_32_Tab, 5000);
    }
    else if(tab_text == "ITS INF Assets/CIs"){
        setTimeout(refresh_ai_33_Tab, 5000);
    }
    else if(tab_text == "ITS Tickets"){
        setTimeout(refresh_ai_31_Tab, 5000);
    }
    else if(tab_text == "My Work"){
        setTimeout(refresh_appMyWork_Tab, 5000);
    }
    else if(tab_text == "People"){
        setTimeout(refresh_addPeople_Tab, 5000);
    }
}


function user_closed_tab_in_header(){

    console.log("close");
    console.log(this);

    var tab_text = this.parentNode.children[0].text;

    if(tab_text == ">TDX Hub"){
        ai_62_timer_on = false;
        
    }
    //FIXME: Downloads needs another way to access it because it doesnt have a title value
    else if(tab_text == ""){
        appDownloads_timer_on = false;
    }
    else if(tab_text == "ITS EUC Assets/CIs"){
        assetai_32_timer_on = false;
    }
    else if(tab_text == "ITS INF Assets/CIs"){
        assetai_33_timer_on = false;
    }
    else if(tab_text == "ITS Tickets"){
        ai_31_timer_on = false;
    }
    else if(tab_text == "My Work"){
        appMyWork_timer_on = false;
    }
    else if(tab_text == "People"){
        addPeople_timer_on = false;
    }

    

}

function add_tab_open_close_event_listeners(obj){
    console.log(obj.children[0].text + " tab Event listener for open/close is set");
    //Event handler for opening tab
    obj.children[0].addEventListener("click", user_clicked_tab_in_header);

    //Event handler for closing tab
    obj.children[2].addEventListener("click", user_closed_tab_in_header);

}

//only call this once.  FIXME: add event listeners for opening and closing the tabs
function set_event_listeners_on_start(){
    if (set_event_listeners_on_start_was_called){
        console.log("ERROR: set_event_listeners_on_start has already been called and should only be called once")
    }else{
        set_event_listeners_on_start = true;
        //eventlisteners for items in the dropdown menu to activate the decision booleans
        document.querySelectorAll('[title="This is a common ticketing application that can be used to transfer tickets from one ticketing application to another. TDX Technicians across the University of Michigan all have access to this hub."]')[0].parentNode.addEventListener("click", function () {
            console.log("TDX Hub add button clicked");
            ai_62_timer_on = true;
            setTimeout(refresh_ai_62_Tab, 5000);
        });
        //note: cannot grab by title for downloads because the title tag isnt set so we are grabbing theTDX Hub "a tag" and getting the next sibling
        /*
        document.querySelectorAll('[title=""]')[0].parentNode.nextSibling.addEventListener("click", function () {
            console.log("Downloads add button clicked");
            appDownloads_timer_on = true;
            refresh_appDownloads_Tab();
        });
        */
        document.querySelectorAll('[title="The Assets/CIs application allows users to easily add and categorize assets, configuration items, vendors, contracts, and locations, allowing an organization to track and maintain hardware and software assets, in addition to other configuration items, cost-effectively. - ITS End User Computing"]')[0].parentNode.addEventListener("click", function () {
            console.log("ITS EUC Assets/CIs add button clicked");
            assetai_32_timer_on = true;
            setTimeout(refresh_ai_32_Tab, 5000);
        });
        document.querySelectorAll('[title="The Assets/CIs application allows users to easily add and categorize assets, configuration items, vendors, contracts, and locations, allowing an organization to track and maintain hardware and software assets, in addition to other configuration items, cost-effectively. - ITS Infrastructure"]')[0].parentNode.addEventListener("click", function () {
            console.log("ITS INF Assets/CIs add button clicked");
            assetai_33_timer_on = true;
            setTimeout(refresh_ai_33_Tab, 5000);
        });
        document.querySelectorAll('[title="Tickets is a comprehensive ITSM application that allows users to track and manage tickets for help desk support or just tracking small pieces of work."]')[0].parentNode.addEventListener("click", function () {
            console.log("Tickets add button clicked");
            ai_31_timer_on = true;
            setTimeout(refresh_ai_31_Tab, 5000);
        });
        document.querySelectorAll('[title="The My Work application gives TDNext users a unified view of their assigned tickets, tasks, approvals and other work items."]')[0].parentNode.addEventListener("click", function () {
            console.log("My Work add button clicked");
            appMyWork_timer_on = true;
            setTimeout(refresh_appMyWork_Tab, 5000);
        });
        document.querySelectorAll('[title="The People application allows users to search, create, and modify People and Account/Department records in TDNext."]')[0].parentNode.addEventListener("click", function () {
            console.log("People add button clicked");
            addPeople_timer_on = true;
            setTimeout(refresh_addPeople_Tab, 5000);
        });

        //event listener for opening desktop tap (which cannot be closed)
        document.getElementById("ui-id-1").addEventListener("click", user_clicked_tab_in_header);

        //event listeners for tabs already in the header
        var tabs_in_header = document.querySelectorAll('[role="tab"]');
        console.log("hello");
        var i;
        for(i = 0; i < tabs_in_header.length; i++){
            count_of_tabs_open++;
            //console.log(tabs_in_header[i]);
            var tab_text = tabs_in_header[i].children[0].text;
            if(tab_text == ">TDX Hub"){
                console.log("TDX Hub tab is active");
                ai_62_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            //FIXME: Downloads needs another way to access it because it doesnt have a title value
            else if(tab_text == ""){
                console.log("Downloads tab is active");
                appDownloads_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            else if(tab_text == "ITS EUC Assets/CIs"){
                console.log("ITS EUC Assets/CIs tab is active");
                assetai_32_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            else if(tab_text == "ITS INF Assets/CIs"){
                console.log("ITS INF Assets/CIs tab is active");
                assetai_33_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            else if(tab_text == "ITS Tickets"){
                console.log("ITS Tickets tab is active");
                ai_31_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            else if(tab_text == "My Work"){
                console.log("My Work tab is active");
                appMyWork_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            else if(tab_text == "People"){
                console.log("People tab is active");
                addPeople_timer_on = true;
                add_tab_open_close_event_listeners(tabs_in_header[i]);
            }
            //console.log(tab_text);
        }

    }
}

// DESKTOP(desktop): sets autorefresh timer and refreshes on webapp load, sets listeners
window.addEventListener("load", function load(event) {


    set_event_listeners_on_start();
    set_event_listeners_on_start_was_called = true;


    //on webapp load
    refresh_Desktop_Tab();



    // auto-refresh timer
    setInterval(function () {
        if (addDesktop_timer_on) {
            try {
                refresh_Desktop_Tab();
            }
            catch {
                console.log("error with Desktop Desktop");
            }
        }
        if (ai_62_timer_on) {
            try {
                refresh_ai_62_Tab();
            }
            catch {
            console.log("error with TDX Hub Desktop");
            }
        }
        if (appDownloads_timer_on) {
            try {
                refresh_appDownloads_Tab();
            }
            catch {
                console.log("error with Downloads Desktop");
            }
        } 
        if (assetai_32_timer_on) {
            try {
                refresh_ai_32_Tab();
            }
            catch {
                console.log("error with ITS EUC Assets/CIs Desktop");
            }
        }
        if (assetai_33_timer_on) {
            try {
                refresh_ai_33_Tab();
            }
            catch {
                console.log("error with ITS INF Assets/CIs Desktop");
            }
        }
        if (ai_31_timer_on) {
            try {
                refresh_ai_31_Tab();
            }
            catch {
                console.log("error with ITS Tickets Desktop");
            }
        }
        if (appMyWork_timer_on) {
            try {
                refresh_appMyWork_Tab();
            }
            catch {
                console.log("error with My Work Desktop");
            }
        }
        if (addPeople_timer_on) {
            try {
                refresh_addPeople_Tab();
            }
            catch {
                console.log("error with People Desktop");
            }
        }        
    }, countdown);

}, false);






