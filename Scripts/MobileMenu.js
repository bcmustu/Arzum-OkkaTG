$(document).ready(function () {
    setupMobileMenu();
});



var resetingMobileNavScrollVal = 40;
var isMenuActive = false;
var isLoginActive = false;


// mobile menu actions
function setupMobileMenu() {
   // if (deviceIs == "smartphone") {
        // move childs to outer hierarchy

    $('#divMobileMenuEntireContent .ulMobileSubMenu1').each(function (index, elem) {
        // 1. move sub
        $(this).remove();
        $('#divMobileMenuEntireContent').append(this);

        // 2. move sub-sub 
        var subSubMenu = $(this).find('.ulMobileSubMenu2');
        if ($(subSubMenu).length > 0)
        {
            $(subSubMenu).remove();
            $('#divMobileMenuEntireContent').append(subSubMenu);
        }
    });

    //}
}



var menuAnimationSpeed = 500;
var menuAnimationStyle = 'swing';
var lastScrollBeforeReset;



function showOrCloseMobileMenu(action) {
    if (!isMenuActive) {
        isMenuActive = true;
        $('#navMobile .aMobileMenuIcon img').attr("src", "Images/close.png").css({ height: 13 });
        $('#divMobileMenuEntireContent ul').removeAttr('style');

        if (!isLoginActive) {
            $('main').fadeOut();
            $('footer').fadeOut(function () {
                lastScrollBeforeReset = lastScrollAmount;
                $(window).scrollTop(0);
                $('#divMobileMenuEntireContent').css({ top: 100 }).fadeIn();
            });
        }
        else {
            showOrCloseMobileLogin("menuSwitch");
            $(window).scrollTop(0);
            $('#divMobileMenuEntireContent').css({ top: 100 }).fadeIn();
        }
    }
    else {
        isMenuActive = false;
        $('#navMobile .aMobileMenuIcon img').attr("src", "Images/nav.png").css({ height: 12 });
        $('#divMobileMenuEntireContent').fadeOut(function () {
            if (action != "menuSwitch") {
                $('main').show();
                $('footer').show();
                $(window).scrollTop(lastScrollBeforeReset);
            }
        });
    }
}



var isMobileMenuAnimated = false;

function showSubMenu(subMenuID) {
    if (!isMobileMenuAnimated) {
        isMobileMenuAnimated = true;
        $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').show().animate({ left: 0 }, menuAnimationSpeed, menuAnimationStyle, function () {
            $("html, body").animate({ scrollTop: 0 }, function () {
                $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').css({ position: 'relative' });
                $('#divMobileMenuEntireContent .ulMobileMenu1').hide();
                $('#divMobileMenuEntireContent .ulMobileMenu2').hide();
                isMobileMenuAnimated = false;
            });
        });
        $('#divMobileMenuEntireContent .ulMobileMenu1').animate({ marginLeft: '-100%' }, menuAnimationSpeed, menuAnimationStyle);
        $('#divMobileMenuEntireContent .ulMobileMenu2').animate({ marginLeft: '-100%' }, menuAnimationSpeed, menuAnimationStyle);
    }
}



function showSubSubMenu(subMenuID, subSubMenuID) {
    if (!isMobileMenuAnimated) {
        isMobileMenuAnimated = true;
        $('#divMobileMenuEntireContent .ulMobileSubMenu2[data-sub-sub-menu-id=' + subSubMenuID + ']').show().animate({ left: 0 }, menuAnimationSpeed, menuAnimationStyle, function () {
            $("html, body").animate({ scrollTop: 0 }, function () {
                $('#divMobileMenuEntireContent .ulMobileSubMenu2[data-sub-sub-menu-id=' + subSubMenuID + ']').css({ position: 'relative' });
                $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').hide();
                isMobileMenuAnimated = false;
            });
        });
        $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').animate({ marginLeft: '-100%' }, menuAnimationSpeed, menuAnimationStyle);
    }
}



function backToMainMenu(subMenuID) {
    if (!isMobileMenuAnimated) {
        isMobileMenuAnimated = true;
        $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').css({ position: 'absolute' }).animate({ left: '100%' }, menuAnimationSpeed, menuAnimationStyle, function () { $(this).hide() });
        $('#divMobileMenuEntireContent .ulMobileMenu1').show().animate({ marginLeft: '0' }, menuAnimationSpeed, menuAnimationStyle);
        $('#divMobileMenuEntireContent .ulMobileMenu2').show().animate({ marginLeft: '0' }, menuAnimationSpeed, menuAnimationStyle, function () {
            isMobileMenuAnimated = false;
        });
    }
}



function backToSubMenu1(subMenuID, subSubMenuID) {
    if (!isMobileMenuAnimated) {
        isMobileMenuAnimated = true;
        $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').show().css({ position: 'absolute', left: '-100%', margin: 0 }).animate({ left: 0 }, menuAnimationSpeed, menuAnimationStyle);
        $('#divMobileMenuEntireContent .ulMobileSubMenu2[data-sub-sub-menu-id=' + subSubMenuID + ']').animate({ marginLeft: '100%' }, menuAnimationSpeed, menuAnimationStyle, function () {
            $('#divMobileMenuEntireContent .ulMobileSubMenu1[data-sub-menu-id=' + subMenuID + ']').css({ position: 'relative' });
            $('#divMobileMenuEntireContent .ulMobileSubMenu2[data-sub-sub-menu-id=' + subSubMenuID + ']').removeAttr('style');
            isMobileMenuAnimated = false;
        });
    }
}
// end