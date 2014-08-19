var deviceIs;
var isMobile;

var wW;
var wH;
var sW;
var sH;
var hH;
var isLandscape = false;
var isPortrait = false;

var scrollTopVal = 0;
var scrollDir;
var lastScrollAmount = 0;
var isScroll = false;

$(document).ready(function () {
    checkDevice();
    scrollEvents();
    setGlobals();
    popupSettings();
    headerShadow();
    smartphoneLandscape();
    headerShadow();
    miscImgLoader();
    openCloseMenu();
    openOrCloseSearch();
    navigation();

    // PPI = getPPI();
    // console.log(PPI);

    //özellikle iphone4 için menüyü scroll edilebilir kıldık.
    if(deviceIs == 'smartphone' && sH <= 500){
        $('nav .divNav').css({ overflow: 'auto' });
        $('nav .divNav .divMenuContent').css({height:230});
    }

});



var orientationChangeTimer = null;
$(window).on("orientationchange", function () {
    if (orientationChangeTimer == null) {
        clearTimeout(orientationChangeTimer);
    }

    orientationChangeTimer = setTimeout(function () {
        smartphoneLandscape();
    }, 300);
});



$(window).resize(function () {
    setGlobals();
    if (!isMobile) {
        closeMenu();
    }
    closeSearch();

});



function setGlobals() {
    wW = $(window).width();
    wH = $(window).height();
    sW = screen.width;
    sH = screen.height;
    hH = $('header').height();
    mH = (deviceIs == "smartphone" ? $('#navMobile').outerHeight() : $('#navMain').outerHeight());
    isLandscape = (wW >= wH);
    isLandscape = (wW >= wH);
    isPortrait = (wW < wH);
}



function checkDevice() {
    isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));

    if (!isMobile) {
        deviceIs = "laptop";
    }
    else if (isMobile && (screen.width / window.devicePixelRatio) > 380) { // tablet
        deviceIs = "tablet";
    }
    else {
        deviceIs = "smartphone";
    }
}



function scrollEvents() {
    $(window).scroll(function () {
        scrollTopVal = $(window).scrollTop();

        if (scrollTopVal > lastScrollAmount) {
            scrollDir = 'down';
        }
        else {
            scrollDir = 'up';
        }
    });
}



function popupSettings() {
    if (!isMobile) {
        $(document).keydown(function (e) {
            if (e.keyCode == 27) {
                closeSearch();
                closeMenu();
            }
        });

        $(window).click(function () {
            closeSearch();
            closeMenu();
        });

        $('#search').click(function (e) {
            e.stopPropagation();
        });
    }
    else {
        $(window).bind('touchstart',function () {
            closeSearch();
        });

        $('#search').bind('touchstart',function (e) {
            e.stopPropagation();
        });

        $(window).bind('touchend',function () {
            closeSearch();
        });

        $('#search').bind('touchend',function (e) {
            e.stopPropagation();
        });
    }
}





/* mobilde yatayda gelecek ekran */
function smartphoneLandscape() {
    if (isMobile && isLandscape) {
        $('#smartphoneLandscape').show();
        $('.divPreloader').addClass('loading');
    }
    else if(isMobile && isPortrait) {
        $('#smartphoneLandscape').hide();
        $('.divPreloader').removeClass('loading');
    }
}






var isMenuOpen = false;//Menünün açık olup olmadığını kontrol etmek için, sayfa başlangıcında kapalı varsayıyoruz.
var isScroll = false;//kullanıcının scroll amaçlı dokunup dokunmadığını tespit etmek için dokunma işleminin başında scroll amaçlı dokunmadığını varsayıyoruz.

function openCloseMenu() {
    if (isMobile) {
        $('nav .imgNav').bind('touchstart', function (e) {//imgNav class'lý div'e dokunma iþlemi baþladýðýnda..
            isScroll = false;
            e.stopPropagation();//sayfanýn gerisine eklenen window.touchstart iþleminden muaf tutuyoruz.

            $(this).bind('touchmove', function () {//kullanýcýnýn ekrana dokunduðu parmaðýný hareket ettirmesi durumunda sayfaya scroll amaçlý dokunduðunu deklare ediyoruz.
                isScroll = true;
            });

            $(this).one('touchend', function (e) {//kullanýcýnýn parmaðýný kaldýrmasý durumunda..
                if (isSearchActive) {
                    closeSearch();
                    setTimeout(function(){
                        if (!isMenuOpen && !isScroll) {//eðer menü kapalýysa, ve eylem scroll amaçlý deðilse..
                            isMenuOpen = true;//deðiþkenleri eski haline getiriyoruz
                            isScroll = false;

                            $('nav .divNav, main, footer, .filtersInHeader, .listingFilters').addClass('menuOn');//aþaðý doðru hareket etmesini istediðimiz elementlere aþaðý doðru hareket etmiþ hallerini içeren class'ý ekliyoruz
                            e.stopPropagation();//sayfanýn gerisine eklenen window.touchend iþleminden muaf tutuyoruz.
                            $(window).bind('touchmove', function (e) {//sayfanýn scroll olmasýný engelliyoruz
                                e.preventDefault();
                            });
                        }
                        else if (isMenuOpen && !isScroll) {//eðer menü açýktýysa, ve eylem scroll amaçlý deðilse..
                            closeMenu();
                        }
                    },300);

                }
                else {
                    if (!isMenuOpen && !isScroll) {//eðer menü kapalýysa, ve eylem scroll amaçlý deðilse..
                        isMenuOpen = true;//deðiþkenleri eski haline getiriyoruz
                        isScroll = false;

                        $('nav .divNav, main, footer, .filtersInHeader, .listingFilters').addClass('menuOn');//aþaðý doðru hareket etmesini istediðimiz elementlere aþaðý doðru hareket etmiþ hallerini içeren class'ý ekliyoruz
                        e.stopPropagation();//sayfanýn gerisine eklenen window.touchend iþleminden muaf tutuyoruz.
                        $(window).bind('touchmove', function (e) {//sayfanýn scroll olmasýný engelliyoruz
                            e.preventDefault();
                        });
                    }
                    else if (isMenuOpen && !isScroll) {//eðer menü açýktýysa, ve eylem scroll amaçlý deðilse..
                        closeMenu();
                    }
                }
            });
        });

        $(window).bind('touchstart', function () {//kullanýcýnýn sayfanýn herhangi bir yerine týklamasý durumunda menünün kapanmasýný saðlýyoruz.
            closeMenu();
            $(this).bind('touchend');
        });

        $('header nav .divNav').bind('touchstart', function (e) {//yukarýda sayfanýn herhangi bir yerine basýldýðýnda menüyü kapatan fonksiyondan, menünün kendisini muaf tutuyoruz.
            e.stopPropagation();
            $('header nav .divNav').bind('touchend', function (e) {
                e.stopPropagation();
            });
        });
    }
    else {
        $('header nav .imgNav').bind('click', function (e) {
            if (isSearchActive) {
                closeSearch();
                setTimeout(function(){
                    if (!isMenuOpen) {
                        //çok saçma bir bug yapıyordu, search kapatma fonksiyonuyla kesişip ismenuopen'ı tekrar false a çekiyordu, böyle çözdüm
                        setTimeout(function(){
                            isMenuOpen = true
                        },100);
                        $('.divNav, main, footer, .filtersInHeader, .listingFilters').addClass('menuOn');
                        e.stopPropagation();
                    }
                    else if (isMenuOpen) {
                        closeMenu();
                    }
                },301)
            }
            else {
                if (!isMenuOpen) {
                    isMenuOpen = true;

                    $('.divNav, main, footer, .filtersInHeader, .listingFilters').addClass('menuOn');
                    e.stopPropagation();
                }
                else if (isMenuOpen) {
                    closeMenu();
                }
            }
        });

        $(window).bind('click', function () {
            closeMenu();
        });

        $('.divNav').bind('click', function (e) {
            e.stopPropagation();
        });
    }
}


function closeMenu() {
    if (isMobile) {
        $('nav .divNav, main, footer, .filtersInHeader, .listingFilters').removeClass('menuOn');//verdiðimiz, elementleri aþaðýda gösteren class'ý geri alýyoruz.
        setTimeout(function () {//setTimeout kurarak kullanýcýyý animasyonu beklemek zorunda býrakýyoruz
            //tespit deðiþkenlerini eski haline getirip scroll'u tekrar aktif hale getiriyoruz.
            isMenuOpen = false;
            isScroll = false;
            $(window).unbind("touchmove");
        }, 300);
    }
    else {
        $('.divNav, main, footer, .filtersInHeader, .listingFilters').removeClass('menuOn');
        setTimeout(function () {
            isMenuOpen = false;
            isScroll = false;
        }, 300);
    }
}




// misc imajlarını sayfa açılışında retina olup olmadığına göre yükleme fonksiyonu
function miscImgLoader() {
    $('body').find('img[data-sixtyThree]').each(function(){
        var miscIdentifier = $(this).attr('data-sixtyThree');
        if (window.devicePixelRatio >= 1.5) {
            if ($(this).hasClass('white')) {
                $(this).attr('src','images/@2x/'+miscIdentifier+'-white@2x.png');
            }
            else {
                $(this).attr('src','images/@2x/'+miscIdentifier+'@2x.png');
            }
        }
        else {
            if ($(this).hasClass('white')) {
                $(this).attr('src','images/'+miscIdentifier+'-white.png');
            }
            else {
                $(this).attr('src','images/'+miscIdentifier+'.png');
            }
        }
    });
}




/*
// search form ile ilgili fonksiyonlar
function setupSearchForm() {
    if ($('nav .divNavIcon').is(':visible')) {
        if ($('nav .divSearch').is(':empty')) {
            var searchFormHTML = $('#search').html();
            $('#search').empty();
            $('nav .divSearch').html(searchFormHTML);
            $('nav .divSearch .divSearchContent input').focus();
        }
    }
    else {
        if ($('#search').is(':empty')) {
            searchFormHTML = $('nav .divSearch').html();
            $('nav .divSearch').empty();
            $('#search').html(searchFormHTML);
        }
    }
}
*/


var isSearchActive = false;

function openOrCloseSearch() {
    if (!isMobile) {
        $('nav .divSearchIcon').bind('click', function (e) {
            e.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
                setTimeout(function(){
                    if (!isSearchActive) {
                        isSearchActive = true;
                        $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                        if (!isMobile) {
                            $('#search input').focus();
                        }
                        else {
                            $('.divSearchContent').append('<div class="pseudoCursor">');
                            $(document).keydown(function (e) {
                                    $('.pseudoCursor').remove();
                            });
                            $('input').on('focus', function(){
                                    $('.pseudoCursor').remove();
                            });
                        }
                    }
                    else {
                        closeSearch();
                    }
                },300)
            }
            else {
                if (!isSearchActive) {
                    isSearchActive = true;
                    $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                    if (!isMobile) {
                        $('#search input').focus();
                    }
                    else {
                        $('.divSearchContent').append('<div class="pseudoCursor">');
                        $(document).keydown(function (e) {
                                $('.pseudoCursor').remove();
                        });
                        $('input').on('focus', function(){
                                $('.pseudoCursor').remove();
                        });
                    }
                }
                else {
                    closeSearch();
                } 
            }
        });
    }
    else {
        $('nav .divSearchIcon').bind('touchstart', function (e) {
            e.stopPropagation();
            isScroll = false
            $('nav .divSearchIcon').bind('touchmove', function(){
                isScroll = true
            });
            $('nav .divSearchIcon').one('touchend',function (e) {
                if (isMenuOpen) {
                    closeMenu();
                    setTimeout(function(){
                        e.stopPropagation();
                        isScroll = false
                        if (!isScroll) {
                            if (isMenuOpen) {
                                closeMenu();
                                setTimeout(function(){
                                    if (!isSearchActive) {
                                        isSearchActive = true;
                                        $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                                            if (!isMobile) {
                                                $('#search input').focus();
                                            }
                                        else {
                                            $('.divSearchContent').append('<div class="pseudoCursor">');
                                            $(document).keydown(function (e) {
                                                    $('.pseudoCursor').remove();
                                            });
                                            $('input').on('focus', function(){
                                                    $('.pseudoCursor').remove();
                                            });
                                        }
                                        $(window).bind('touchmove', function (e) {//sayfanýn scroll olmasýný engelliyoruz
                                            e.preventDefault();
                                        });
                                    }
                                    else {
                                        closeSearch();
                                    }
                                },300)
                            }
                            else {
                                if (!isSearchActive) {
                                    e.stopPropagation();
                                    isSearchActive = true;
                                    $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                                        if (!isMobile) {
                                            $('#search input').focus();
                                        }
                                        else {
                                            $('.divSearchContent').append('<div class="pseudoCursor">');
                                            $(document).keydown(function (e) {
                                                    $('.pseudoCursor').remove();
                                            });
                                            $('input').on('focus', function(){
                                                    $('.pseudoCursor').remove();
                                            });
                                        }
                                }
                                else {
                                    closeSearch();
                                } 
                            }
                        }
                    },300)
                }
                else {
                        e.stopPropagation();
                        isScroll = false
                        if (!isScroll) {
                            if (isMenuOpen) {
                                closeMenu();
                                setTimeout(function(){
                                    if (!isSearchActive) {
                                        isSearchActive = true;
                                        $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                                            if (!isMobile) {
                                                $('#search input').focus();
                                            }
                                        else {
                                            $('.divSearchContent').append('<div class="pseudoCursor">');
                                            $(document).keydown(function (e) {
                                                    $('.pseudoCursor').remove();
                                            });
                                            $('input').on('focus', function(){
                                                    $('.pseudoCursor').remove();
                                            });
                                        }
                                        $(window).bind('touchmove', function (e) {//sayfanýn scroll olmasýný engelliyoruz
                                            e.preventDefault();
                                        });
                                    }
                                    else {
                                        closeSearch();
                                    }
                                },300)
                            }
                            else {
                                if (!isSearchActive) {
                                    e.stopPropagation();
                                    isSearchActive = true;
                                    $('#search, main, footer, .filtersInHeader, .listingFilters').addClass('topSearch');
                                        if (!isMobile) {
                                            $('#search input').focus();
                                        }
                                        else {
                                            $('.divSearchContent').append('<div class="pseudoCursor">');
                                            $(document).keydown(function (e) {
                                                    $('.pseudoCursor').remove();
                                            });
                                            $('input').on('focus', function(){
                                                    $('.pseudoCursor').remove();
                                            });
                                        }
                                }
                                else {
                                    closeSearch();
                                } 
                            }
                        }
                    
                }
            })
        });
    }
}


function closeSearch() {
    if (isSearchActive) {
        $('#search, main, footer, .filtersInHeader, .listingFilters').removeClass('topSearch');
        $('.pseudoCursor').remove();
        $('#textarea').blur();
        setTimeout(function () {
            isSearchActive = false;
            $(window).unbind("touchmove");
        }, 300);
    }
}


function headerShadow(){
    $(window).scroll(function(){
        if (scrollTopVal > 0) {
            $('header').addClass('headerShadow');
        };
    });
}

function navigation() {
    $('.divNav *').bind('touchstart',function(){
        isScroll = false;
        $(this).bind('touchmove',function(){
            isScroll = true;
        });
        $(this).bind('touchend',function(){
            $('.divNav *').each(function(){
                $(this).removeClass('hover');
            })
            if (!isScroll) {
                $(this).addClass('hover');
            };
        });
    });
}