# frozen_string_literal: true

class ProductsController < AuthenticatedController
  def index
    @products = ShopifyAPI::Product.all()
    render(json: { products: @products })
  end

  def create  
      test_session = ShopifyAPI::Auth::Session.new(
      shop:"ongraph-store121.myshopify.com",
      access_token:"shpua_bbecd6f9ac004d3af7bba3d44ef96bb8",     
      )    
      product = ShopifyAPI::Product.new(session: test_session)
      product.title = "Burton Custom Freestyle 151"
      product.body_html = "<strong>Good snowboard!</strong>"
      product.vendor = "Burton"
      product.product_type = "Snowboard"
      product.status = "draft"
      product.save!
      render(json: { product: product })
  end

  
end
