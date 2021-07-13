defmodule Dispatcher do
  use Matcher

  define_accept_types [
    html: [ "text/html", "application/xhtml+html" ],
    json: [ "application/json", "application/vnd.api+json" ],
  ]

  @any %{}
  @json %{ accept: %{ json: true } }
  @html %{ accept: %{ html: true } }

  # In order to forward the 'themes' resource to the
  # resource service, use the following forward rule.
  #
  # docker-compose stop; docker-compose rm; docker-compose up
  # after altering this file.
  #
  # match "/themes/*path", @json do
  #   Proxy.forward conn, path, "http://resource/themes/"
  # end

  match "/books/*path" do
    Proxy.forward conn, path, "http://books/books/"
  end

  match "/authors/*path" do
    Proxy.forward conn, path, "http://books/authors/"
  end

  match "/homes/*path" do
    Proxy.forward conn, path, "http://homes/homes/"
  end

  match "/inhabitants/*path" do
    Proxy.forward conn, path, "http://homes/inhabitants/"
  end

  match "_", %{ last_call: true } do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end


end
