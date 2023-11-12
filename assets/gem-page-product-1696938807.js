

    (function( jQuery ){
  var $module = jQuery('#m-1698936529761').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );
  
    
  
    
  (function( jQuery ){
  var $module = jQuery('#m-1698936529707').children('.module');


if($('.gempage-editing').length < 1){
  
  function formatDay(day){
    var fday;
    
    if(day == 1 || day == 21 || day == 31){
      fday = day + 'st';
    }else if(day == 2 || day == 22){
      fday = day + 'nd';
    }else if(day == 3 || day == 23){
      fday = day + 'rd';
    }else{
      fday = day + 'th'
    }
    return fday;
  }
  
      //debug
      var debug = 0;
      //
  
  var $wrapper = $module.find('.gp_custom-shipping-time');
  var $countdownElm = $module.find('.gp_custom-countdown');
  var $hourElm = $module.find('.gp_hour');
  var $minutesElm = $module.find('.gp_minutes');
  var $todayElm = $module.find('.gp_custom-today');
  var $todayP2Elm = $module.find('.gp_custom-today-p2');
  
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
  utc = 1;
 
 
 function addDate(plus){
  
    //Add today
    var today = new Date();
    today.setUTCHours(today.getUTCHours() + utc)
    
    today.setUTCDate(today.getUTCDate() + plus);
    
    
        //debug
        today.setUTCDate(today.getUTCDate() + debug);
        console.log("Debug [today]: " + today.toUTCString() + utc);
        //
        
    if(today.getUTCDay() == 0 || today.getUTCDay() == 6){
      $module.find('.gp_custom-shipping-time').addClass('gp-hide');
    }else{
      $module.find('.gp_custom-shipping-time').removeClass('gp-hide');
    }
    
    var todayP = 0; 
    
    
    if(today.getUTCDay() == 0){
      today.setUTCDate(today.getUTCDate() + 1);
      todayP = 1;
    }else if(today.getUTCDay() == 6){
      today.setUTCDate(today.getUTCDate() + 2);
      todayP = 2;
    } 
  
    $todayElm.html(weekday[today.getUTCDay()] + ' ' + formatDay(today.getUTCDate()) + ' ' + month[today.getUTCMonth()])
    
    
    //Add today + 2
    var todayP2 = new Date();
    todayP2.setUTCHours(todayP2.getUTCHours() + utc)
    today.setUTCDate(today.getUTCDate() + plus);
    
    todayP2.setUTCDate(todayP2.getUTCDate() + 2);
    
        //debug
        todayP2.setUTCDate(todayP2.getUTCDate() + debug);
        console.log("Debug [today + 2]: " + todayP2.toUTCString()+ utc);
        //
    
    
    todayP2.setUTCDate(todayP2.getUTCDate() + todayP);
    if(todayP2.getUTCDay() == 0){
      todayP2.setUTCDate(todayP2.getUTCDate() + 1);
    }else if(todayP2.getUTCDay() == 6){
      todayP2.setUTCDate(todayP2.getUTCDate() + 2);
    } 
    $todayP2Elm.html(weekday[todayP2.getUTCDay()] + ' ' + formatDay(todayP2.getUTCDate()) + ' ' + month[todayP2.getUTCMonth()])
  
  }
  
  addDate(0);

  
  //Add countdown
  
  function setCountdown(){
    var now = new Date();
    now.setUTCHours(now.getUTCHours() + utc);
    var a  = now.getUTCHours() * 60 + now.getUTCMinutes();
    var b = 14 * 60;
    
    if(a < b){
      var c = b - a;
      $hourElm.text(Math.floor(c / 60));
      $minutesElm.text(c % 60);
    }else{
      var c = b + (24 * 60) - a;
      $hourElm.text(Math.floor(c / 60));
      $minutesElm.text(c % 60);
    }
    
    if(a < b){
      addDate(0);
    }else{
      addDate(1);
    }
 
  }

  interval = setInterval( function() {
    setCountdown()  
  }, 60000);
  
  setCountdown();
  
 
  //Check variant out stock
  var $product = $module.closest('[data-label="Product"]').children('.module');
    if ($product.length == 0) {
        $product = $module.closest('[data-icon="gpicon-product"]').children('.module');
    }
    if ($product.data('gfv3product') != undefined) {
      var selectedVariant = $product.data('gfv3product').getVariant();
      triggerChangeVariant(selectedVariant)
    }

  var currentWrapProductId = $module.closest('[data-label="Product"]').attr('id');
  
  function changeVariantFunction(variant){
    triggerChangeVariant(variant)
  }
    
  if (window.GEMSTORE) {
      window.GEMSTORE.subscribe("product-"+currentWrapProductId+"-variant", changeVariantFunction);
  }
  
  function triggerChangeVariant(variant){
    if(variant.available){
      $wrapper.addClass('gp_show');
    }else{
      $wrapper.removeClass('gp_show');
    }
    
    var quantity = $module.find('.gf-variant-' + variant.id).attr('data-inventory_quantity');
    if(quantity <= 0){
      $wrapper.removeClass('gp_show');
    }
    
  }
  
}

})( window.GemQuery || jQuery );(function( jQuery ){
  
  //set initial ATC & Buy Now button - am
  const defer = (fn, ...args) => setTimeout(fn, 1000, ...args);
  
  function atc() {
    var dateText = document.getElementById('hidden-current-variant-message').innerHTML;
  
    if (dateText) {
      $('.AddToCartText').html("PRE ORDER");
      $(".gf_p-dynamic-checkout-button").hide();
      $("#m-1698936529705").hide();
    } else {
      $(".gf_p-dynamic-checkout-button").show();
      $("#m-1698936529705").show();
    }
  //})();
  }

  defer(atc);




  // repeated JS for variant change  - am
  var $module = jQuery('#m-1682498763297').children('.module');
  var swatchText = $module.attr('data-swatch-text') !== undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {

      // dynamic Preorder text ATC & By Now button.  impacts chassis & handles change
      var variantsMetafields = jQuery.parseJSON($("#hidden-variant-metafields").html());
      var today = $("#hidden-today").html();

      $("#hidden-current-variant-metafield").hide(); // delete the field 1st. If item "coming soon" no variant shows. So start with hidden field b/c can't delete later based on variant.id
      $("#hidden-current-variant-message").hide();
      $(".gf_p-dynamic-checkout-button").show();     // show the dynamic button 1st before possibly hiding
      $(".gf_p-dynamic-checkout-button").show();
      $("#m-1698936529705").show();
      
      variantsMetafields.forEach(function(variantMetafield) {
        if (variantMetafield.variant_id == variant.id) {
          if (variantMetafield.metafield_value !== false) {

            if (variantMetafield.metafield_value_s > today) {
              $("#hidden-current-variant-metafield").html("Order today for dispatch by "+variantMetafield.metafield_value);
              $("#hidden-current-variant-metafield").show();
              $("#hidden-current-variant-message").html("We will fulfill the item as soon as it becomes available");
              $("#hidden-current-variant-message").show();
              $(".AddToCartText").html("PRE ORDER"); // goes back to ATC automatically on next variant change if necessary
              $(".gf_p-dynamic-checkout-button").hide();
            } else {
              // $(".AddToCartText").html("ADD TO CART");
              $(".gf_p-dynamic-checkout-button").show();
              $("#m-1698936529705").show();
            }
          } else {
            // $(".AddToCartText").html("ADD TO CART");
            $(".gf_p-dynamic-checkout-button").show();
            $("#m-1698936529705").show();
          }
        }
      });


    }
  });

})( window.GemQuery || jQuery );




(function( jQuery ){
  // repeated JS for variant change
  var $module = jQuery('#m-1698936529804').children('.module');
  var swatchText = $module.attr('data-swatch-text') !== undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {
      document.dispatchEvent(new CustomEvent('variant:change', {
        detail : {
          variant: variant
        }
      }));

    // dynamic Preorder text ATC & By Now button.  impacts chassis & handles change  - am
      var variantsMetafields = jQuery.parseJSON($("#hidden-variant-metafields").html());
      var today = $("#hidden-today").html();

      $("#hidden-current-variant-metafield").hide(); // delete the field 1st. If item "coming soon" no variant shows. So start with hidden field b/c can't delete later based on variant.id
      $("#hidden-current-variant-message").hide();
      $(".gf_p-dynamic-checkout-button").show();     // show the dynamic button 1st before possibly hiding
      $("#m-1698936529705").show();     // show the dynamic button 1st before possibly hiding
      $(".gf_p-dynamic-checkout-button").show();
      $("#m-1698936529705").show();
      
      variantsMetafields.forEach(function(variantMetafield) {
        if (variantMetafield.variant_id == variant.id) {
          if (variantMetafield.metafield_value !== false) {

            if (variantMetafield.metafield_value_s > today) {
              $("#hidden-current-variant-metafield").html(" Order today for dispatch by "+variantMetafield.metafield_value);
              $("#hidden-current-variant-metafield").show();
              $("#hidden-current-variant-message").html(" We will fulfill the item as soon as it becomes available");
              $("#hidden-current-variant-message").show();
              $(".AddToCartText").html("PRE ORDER"); // goes back to ATC automatically on next variant change if necessary
              $(".gf_p-dynamic-checkout-button").hide();
              $("#m-1698936529705").hide();
            } else {
              // $(".AddToCartText").html("ADD TO CART");
              $(".gf_p-dynamic-checkout-button").show();
              $("#m-1698936529705").show();
            }
          } else {
            // $(".AddToCartText").html("ADD TO CART");
            $(".gf_p-dynamic-checkout-button").show();
            $("#m-1698936529705").show();
          }
        }
      });

    }
  });
})( window.GemQuery || jQuery );
    (function( jQuery ){
  var $module = jQuery('#m-1698936529706').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698936529714').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1698936529723').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  
    
  
    
  window.__gfAnimate.registerPageLoaded(jQuery("#e-1698846384605-1"), '{"animation":{"screens":{"lg":true,"md":true,"sm":true,"xs":true},"name":"shake-x","delay":0,"duration":2050,"iteration-count":"1"},"interaction":{"key":"after-page-loaded","type":"level2"}}');
    
  (function( jQuery ){
  // var $module = jQuery('#m-1686640113860').children('.module');
  // You can add custom Javascript code right here.
console.log("before clicking button");

$(".form-mobile").click(function(e){
  exponea.showBanner('64df736ed11e654477c50865');
  console.log("after clicking button");
});
})( window.GemQuery || jQuery );(function( jQuery ){
  // var $module = jQuery('#m-1679325869592').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698936529741').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1698936529734').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  
    
  
    
  window.__gfAnimate.registerPageLoaded(jQuery("#e-1698846362345-1"), '{"animation":{"screens":{"lg":true,"md":true,"sm":true,"xs":true},"name":"shake-x","delay":0,"duration":2050,"iteration-count":"1"},"interaction":{"key":"after-page-loaded","type":"level2"}}');
    
  (function( jQuery ){
  // var $module = jQuery('#m-1686640113860').children('.module');
  // You can add custom Javascript code right here.
console.log("before clicking button");

$(".form-desktop").click(function(e){
  exponea.showBanner('64df736ed11e654477c50865');
  console.log("after clicking button");
});
})( window.GemQuery || jQuery );
    (function( jQuery ){
  // var $module = jQuery('#m-1698936529763').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  (function(jQuery) {
  var $module = jQuery('#m-1698936529804').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {
      document.dispatchEvent(new CustomEvent('variant:change', {
        detail : {
          variant: variant
        }
      }));
    }
  });
})(window.GemQuery || jQuery);
    (function( jQuery ){
  // var $module = jQuery('#m-1698936529673').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  (function( jQuery ){
  // var $module = jQuery('#m-1698936529747').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1696933869047').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1696933869153').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1696933869089').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  
    
  
    
  
    
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1696933869119').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1696939390088').children('.module');
  if(jQuery().gfYoutube) {
    $module.gfYoutube();
  }
})( window.GemQuery || jQuery );
  
    
  
    
  
    
  
    (function( jQuery ){
  try {
    var $module = jQuery('#m-1696939492882').children('.module');   
    var navspeed = $module.data('navspeed'),
      autoplaytimeout = $module.data('autoplaytimeout'),
      autoplayhoverpause = $module.data('autoplayhoverpause'),
      navlg = $module.data('navlg'),
      navmd = $module.data('navmd'),
      navsm = $module.data('navsm'),
      navxs = $module.data('navxs'),
      collg = $module.data('collg'),
      colmd = $module.data('colmd'),
      colsm = $module.data('colsm'),
      colxs = $module.data('colxs'),
      dotslg = $module.data('dotslg'),
      dotsmd = $module.data('dotsmd'),
      dotssm = $module.data('dotssm'),
      dotsxs = $module.data('dotsxs'),
      marginlg = parseInt($module.data('marginlg')),
      marginmd = parseInt($module.data('marginmd')),
      marginsm = parseInt($module.data('marginsm')),
      marginxs = parseInt($module.data('marginxs'));

    var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
    if(mode == 'production') {
    var autoplay = $module.data('autoplay'), 
        autoRefresh = true, 
        loop = $module.data('loop');
    } else {
    var autoplay = 0, 
        autoRefresh = false, 
        loop = 0;
    }

    var initCarousel = function() {
      $module.owlCarousel({
        mouseDrag: false,
        autoplayHoverPause: autoplayhoverpause,
        autoplay: autoplay,
        autoRefresh: autoRefresh,
        autoplaySpeed: navspeed,
        autoplayTimeout: autoplaytimeout,
        loop: loop,
        navSpeed: navspeed,
        autoWidth: !1,
        responsiveClass:true,
        responsive:{
          0:{
            items:colxs,
            nav: navxs,
            dots:dotsxs,
            margin: marginxs
          },
          768:{
            items:colsm,
            nav: navsm,
            dots:dotssm,
            margin: marginsm
          },
          992:{
            items:colmd,
            nav: navmd,
            dots:dotsmd,
            margin: marginmd
          },
          1200:{
            items:collg,
            nav: navlg,
            dots:dotslg,
            margin: marginlg
          }
        },
        onInitialized: function () {
          $module.closest('.module-wrap[data-label="Carousel"]').addClass('gf-carousel-loaded');
          jQuery(window).trigger("resize");
        }
      });
    }
    
    // Fix nested carousel bug	
    if ($module.parent().parent().closest('.module-wrap[data-label="Carousel"]').length > 0) {	
      setTimeout(function() {	
        initCarousel();	
      }, 300)	
    } else {	
      initCarousel();	
    }
  } catch(err) {}
})( window.GemQuery || jQuery );
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    (function( jQuery ){
  try {
    var $module = jQuery('#m-1696933869074').children('.module');
    var single = $module.attr('data-single');
    var openDefault = $module.attr('data-openDefault');
    var openTab = $module.attr('data-openTab');
    var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';

    if(openDefault == 0 || openDefault == '0') {
      openTab = '0';
    }

    $module.gfAccordion({
      single: single,
      openTab: openTab,
      mode: mode,
      onChanged: function() {	
        // Fix (P) Desc read more bug	
        $module.find('.module-wrap[data-label="(P) Description"]').each(function(index, el) {	
          if (jQuery(el).children('.module').data('gfv3productdesc') != undefined) {	
            jQuery(el).children(".module").data("gfv3productdesc").initReadMore();	
          }	
        })	
      }
    });

    var borderColor = $module.attr('data-borderColor');
    var borderSize = $module.attr('data-borderSize');

    $module.children('[data-accordion]').children('[data-control]').css('border-bottom', borderSize + ' solid ' + borderColor);
    $module.children('[data-accordion]').children('[data-content]').children().css('border-bottom', borderSize + ' solid ' + borderColor);
  } catch(err) {}
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1696933869060').children('.module');
  $module.gfV3ProductDesc();
})( window.GemQuery || jQuery );
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1696933869070').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1696933869103').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    (function( jQuery ){
  // var $module = jQuery('#m-1696933869009').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1696933869054').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1696933869173').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    
  
    
  
    
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698137939901').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698137939875').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  var $module = jQuery('#m-1698846376044').children('.module');
  $module.gfV1Popup();

  var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
  if(mode == 'dev') {
    var moduleId = "1698846376044";
    var moduleIdSlug = moduleId.toString().replace(/-/g, '');
    if (moduleIdSlug == "1698846376044") {
      window.getPopup1698846376044 = function() {
        return $module.data('gfv1popup');
      }
    }
  }
})( window.GemQuery || jQuery );
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  
    
  window.__gfFlowActions = []; window.__gfFlowActions.push([{"source":{"id":"#m-1686063381526"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763325","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1682498763325"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1686063334056"},"events":[{"key":"click"}],"targets":[{"id":"#e-1686063777164","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1686063777164"},{"id":"#m-1686063777097","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":50}}],"rename":"Accordion: #m-1686063777097"}],"disableOn":["md","xs"]}]);window.__gfFlowActions.push([{"source":{"id":"#e-1696934032105","target":".gf_button"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763347","actions":[{"key":"slideUp","type":2,"data":{"delay":0,"duration":300}}],"rename":"Text Block: #e-1682498763347"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1696933869153"},"events":[{"key":"click"}],"targets":[{"id":"#e-1686063777164","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1686063777164"},{"id":"#m-1686063777085","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":50}}],"rename":"Liquid: #m-1686063777085"}],"disableOn":["md","xs"]}]);window.__gfFlowActions.push([{"source":{"id":"#e-1696933869097","target":".gf_button"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763347","actions":[{"key":"slideUp","type":2,"data":{"delay":0,"duration":300}}],"rename":"Text Block: #e-1682498763347"}]}]);window.__gfFlowActions.push([{"source":{"id":"#e-1696933869086","target":".gf_button"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763347","actions":[{"key":"slideUp","type":2,"data":{"delay":0,"duration":300}}],"rename":"Text Block: #e-1682498763347"}]}]);window.__gfFlowActions.push([{"source":{"id":"#e-1696933869090","target":".gf_button"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763347","actions":[{"key":"slideUp","type":2,"data":{"delay":0,"duration":300}}],"rename":"Text Block: #e-1682498763347"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1698936529714"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763325","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1682498763325"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1698936529741"},"events":[{"key":"click"}],"targets":[{"id":"#e-1698936529691","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1698936529691"},{"id":"#m-1698936529672","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":50}}],"rename":"Accordion: #m-1698936529672"}],"disableOn":["md","xs"]}]); window.__gfV1FlowActions.init();