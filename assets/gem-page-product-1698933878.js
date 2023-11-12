

    (function( jQuery ){
  var $module = jQuery('#m-1698935914587').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );
  
    
  
    
  (function( jQuery ){
  var $module = jQuery('#m-1698935914573').children('.module');


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
      $("#m-1698935914540").hide();
    } else {
      $(".gf_p-dynamic-checkout-button").show();
      $("#m-1698935914540").show();
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
      $("#m-1698935914540").show();
      
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
              $("#m-1698935914540").show();
            }
          } else {
            // $(".AddToCartText").html("ADD TO CART");
            $(".gf_p-dynamic-checkout-button").show();
            $("#m-1698935914540").show();
          }
        }
      });


    }
  });

})( window.GemQuery || jQuery );




(function( jQuery ){
  // repeated JS for variant change
  var $module = jQuery('#m-1698935914529').children('.module');
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
      $("#m-1698935914540").show();     // show the dynamic button 1st before possibly hiding
      $(".gf_p-dynamic-checkout-button").show();
      $("#m-1698935914540").show();
      
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
              $("#m-1698935914540").hide();
            } else {
              // $(".AddToCartText").html("ADD TO CART");
              $(".gf_p-dynamic-checkout-button").show();
              $("#m-1698935914540").show();
            }
          } else {
            // $(".AddToCartText").html("ADD TO CART");
            $(".gf_p-dynamic-checkout-button").show();
            $("#m-1698935914540").show();
          }
        }
      });

    }
  });
})( window.GemQuery || jQuery );
    (function( jQuery ){
  var $module = jQuery('#m-1698935914512').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698935914507').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1698935914525').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
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
  // var $module = jQuery('#m-1698935914476').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1698935914475').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
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
  // var $module = jQuery('#m-1698935914495').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  (function(jQuery) {
  var $module = jQuery('#m-1698935914529').children('.module');
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
  // var $module = jQuery('#m-1698935914547').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  try {
    var $module = jQuery('#m-1698935914490').children('.module');
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
  var $module = jQuery('#m-1698935914569').children('.module');
  $module.gfV3ProductDesc();
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698935914577').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1698935914478').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1698935914557').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    (function( jQuery ){
  // var $module = jQuery('#m-1698935914613').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698935914445').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1698935914551').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  (function( jQuery ){
  // var $module = jQuery('#m-1698935914483').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682501084243').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1686063466291').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  window.__gfFlowActions = []; window.__gfFlowActions.push([{"source":{"id":"#m-1698933891499"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763325","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1682498763325"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1698933891527"},"events":[{"key":"click"}],"targets":[{"id":"#e-1686063777164","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1686063777164"},{"id":"#m-1686063777097","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":50}}],"rename":"Accordion: #m-1686063777097"}],"disableOn":["md","xs"]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1698935914507"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763325","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1682498763325"}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1698935914476"},"events":[{"key":"click"}],"targets":[{"id":"#e-1698935914585","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1698935914585"},{"id":"#m-1698935914490","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":50}}],"rename":"Accordion: #m-1698935914490"}],"disableOn":["md","xs"]}]); window.__gfV1FlowActions.init();