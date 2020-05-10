
// Requisição da API THE RICK AND MORTY API
// Documentação oficial: https://rickandmortyapi.com/

function requestAjax(){
    
    var apiRest = "https://rickandmortyapi.com/api/character/";

    $.getJSON(apiRest).done(function(data) {

        var itens = data.results.map(function(item) {
            
            return  '<article class="card" data-id="'+ item.id +'">'
                    + '<div class="infos-persona">'            
                    + '<figure><img data-src="'+ item.image +'" src="https://placehold.it/300x300&text='+ item.name +'" alt="' + item.name + '"/></figure>'
                    + '<div class="infos-txt">'                    
                    + '<h3><span>#'+ item.id +'&nbsp;&nbsp;</span>' + item.name + '</h3>'
                    + '<p> Species: <span>' + item.species + '</span></p>'
                    + '<p> Status: <span>' + item.status + '</span></p>'
                    + '<p> Gender: <span>' + item.gender + '</span></p>'
                    + '<p> Origin: <span>' + item.origin.name + '</span></p>'
                    + '<p> Last Location: <span>' + item.location.name + '</span></p>'
                    + '<p> Episodies: <span>' + item.episode.length + '</span></p>'
                    + '</div>'                    
                    + '</div>'
                    + '</article>'
        })
        if (itens.length) {
            var content = itens.join('')
            $('#cards-personagens').append(content)
        }
        
    })

    .success(function() { 
        console.log("Sucesso")
    })
    .error(function() { 
        console.log("erro")
    })
    .complete(function() { 
        console.log("Completo")
    })

}

function seachPersonage(){
    $("#seachData").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $(".card").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}



function lazyLoad(){
    // Dynamically load images while scrolling
    // Source: github.com/ByNathan/jQuery.loadScroll
    // Version: 1.0.1

    (function($) {
        
        $.fn.loadScroll = function(duration) {
        
            var $window = $(window),
                images = this,
                inview,
                loaded;

            images.one('loadScroll', function() {
                
                if (this.getAttribute('data-src')) {
                    this.setAttribute('src',
                    this.getAttribute('data-src'));
                    this.removeAttribute('data-src');
                    
                    if (duration) {
                        
                        $(this).hide()
                            .fadeIn(duration)
                            .add('img')
                            .removeAttr('style');
                        
                    } else return false;
                }
                
            });
        
            $window.scroll(function() {
            
                inview = images.filter(function() {
                    
                    var a = $window.scrollTop(),
                        b = $window.height(),
                        c = $(this).offset().top,
                        d = $(this).height();
                        
                    return c + d >= a && c <= a + b;
                    
                });
                
                loaded = inview.trigger('loadScroll');
                images = images.not(loaded);
                        
            });
        };
        
    })(jQuery);

    $(document).on("scroll", function(){
        $('img').loadScroll(1000);
    })
}

$(document).ready(function() {
    requestAjax();  
    seachPersonage();
    lazyLoad()
});








    