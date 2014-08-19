$(window).load(function () {
});

$(document).ready(function () {
    selectDeliveryAddress();
    showOrHideNewDeliveryAddressForm();
    showOrHideBillingInfo();
    showOrHideNewBillingAddressForm();
    showOrHideOtherPersonPickUpDetails();
    showOrHideGiftNoteDetails();
});




// selects different payment methods
var isPayMethodAnimated = false;
var currSelectedLI = 1;

function showOrHidePaymentMethod(methodNo) {
    if (!isPayMethodAnimated) {
        var selectedLI = $('#payment .divCardInfo.tab .divContent ul li:nth-child(' + methodNo + ')');

        if (!$(selectedLI).hasClass('active')) {
            isPayMethodAnimated = true;

            // remove active class from all LI
            $('#payment .divCardInfo.tab .divContent ul li:nth-child(' + currSelectedLI + ')').removeClass('active');

            // add active class to clicked LI
            currSelectedLI = methodNo;
            $('#payment .divCardInfo.tab .divContent ul li:nth-child(' + currSelectedLI + ')').addClass('active');

            // fadeOut content
            $('#payment .divCardInfo.tab .divContent .divPayMethod').stop(true, false).fadeOut(500, function () {
                $(this).removeClass('active');
            });

            // fadeIn selected content
            $('#payment .divCardInfo.tab .divContent .divPayMethod.methodNo' + methodNo).delay(500).fadeIn(500, function () {
                $(this).addClass('active');
                isPayMethodAnimated = false;
            });
        }
    }
}
// end



// select delievery address
function selectDeliveryAddress() {
    $('#payment .divAddressInfo .divContent .divAddress').click(function () {
        $('#payment .divAddressInfo .divContent .divAddress').each(function (index, elem) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });

        $(this).addClass('active');
    });
}
// end



// shows or hides new delivery address form
var isDeliveryAddressFormActive = false;
function showOrHideNewDeliveryAddressForm() {
    $('#payment .divAddressInfo .divContent .divAddressSelection1 input[type="radio"]').change(function () {
        if (!isDeliveryAddressFormActive) {
            isDeliveryAddressFormActive = true;
            $('#payment .divAddressInfo .divContent .divAddresses').stop(true, false).fadeOut(300, function () {
                $('#payment .divAddressInfo .divContent .divNewAddress').stop(true, false).fadeIn(300);
            });
        }
        else if (isDeliveryAddressFormActive) {
            isDeliveryAddressFormActive = false;
            $('#payment .divAddressInfo .divContent .divNewAddress').stop(true, false).fadeOut(300, function () {
                $('#payment .divAddressInfo .divContent .divAddresses').stop(true, false).fadeIn(300);
            });
        }
    });
}
// end



// shows or hides billing info details
function showOrHideBillingInfo() {
    $('#payment .divAddressInfo .divContent .divActivateBillingAddress input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('#payment .divAddressInfo .divContent .divAddressSelection2 input[type="radio"]')[0].checked = true;
            $('#payment .divAddressInfo .divContent .divAddressSelection2').stop(true, false).fadeIn(300);
            $('#payment .divAddressInfo .divContent .divBillingAddresses').stop(true, false).fadeIn(300);
        }
        else {
            $('#payment .divAddressInfo .divContent .divAddressSelection2').stop(true, false).fadeOut(300);

            if (!isBillingAddressFormActive) {
                $('#payment .divAddressInfo .divContent .divBillingAddresses').stop(true, false).fadeOut(300);
            }
            else if (isBillingAddressFormActive) {
                $('#payment .divAddressInfo .divContent .divNewBillingAddress').stop(true, false).fadeOut(300);
            }

            isBillingAddressFormActive = false;
        }
    });
}
// end



// shows or hides new billing address form
var isBillingAddressFormActive = false;
function showOrHideNewBillingAddressForm() {
    $('#payment .divAddressInfo .divContent .divAddressSelection2 input[type="radio"]').change(function () {
        if (!isBillingAddressFormActive) {
            isBillingAddressFormActive = true;
            $('#payment .divAddressInfo .divContent .divBillingAddresses').stop(true, false).fadeOut(300, function () {
                $('#payment .divAddressInfo .divContent .divNewBillingAddress').stop(true, false).fadeIn(300);
            });
        }
        else if (isBillingAddressFormActive) {
            isBillingAddressFormActive = false;
            $('#payment .divAddressInfo .divContent .divNewBillingAddress').stop(true, false).fadeOut(300, function () {
                $('#payment .divAddressInfo .divContent .divBillingAddresses').stop(true, false).fadeIn(300);
            });
        }
    });
}
// end



// shows or hides other person pick up details form
function showOrHideOtherPersonPickUpDetails() {
    $('#payment .divAddressInfo .divContent .divOtherPersonPickUp input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('#payment .divAddressInfo .divContent .divOtherPersonPickUpDetails').stop(true, false).fadeIn(300);
        }
        else {
            $('#payment .divAddressInfo .divContent .divOtherPersonPickUpDetails').stop(true, false).fadeOut(300);
        }
    });
}
// end



// shows or hides gift note details form
function showOrHideGiftNoteDetails() {
    $('#payment .divGiftInfo .divContent .divGift.note input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('#payment .divGiftInfo .divContent .divOrderNoteDetails').stop(true, false).fadeIn(300);
        }
        else {
            $('#payment .divGiftInfo .divContent .divOrderNoteDetails').stop(true, false).fadeOut(300);
        }
    });
}
// end