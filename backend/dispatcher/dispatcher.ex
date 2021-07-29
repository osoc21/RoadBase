defmodule Dispatcher do
  use Matcher

  define_accept_types [
    html: [ "text/html", "application/xhtml+html" ],
    json: [ "application/json", "application/vnd.api+json" ],
    any: [ "*/*" ],
  ]

  # @any %{}
  # @json %{ accept: %{ json: true } }
  # @html %{ accept: %{ html: true } }



  # Handle OPTIONS preflight HTTP request
  options "/*" do
    conn
    |> Plug.Conn.put_resp_header( "access-control-allow-headers", "content-type,accept" )
    |> Plug.Conn.put_resp_header( "access-control-allow-methods", "*" )
    |> send_resp( 200, "{ \"message\": \"ok\" }" )
  end


  match "/road-sign-instances/*path" do
    Proxy.forward conn, path, "http://resources/road-sign-instances/"
  end

  match "/heights/*path" do
    Proxy.forward conn, path, "http://resources/heights/"
  end

  match "/accidents/*path" do
    Proxy.forward conn, path, "http://resources/accidents/"
  end


  # "Verkeersborden" migration microservice
  match "/road-sign-concepts/*path" do
    Proxy.forward conn, path, "http://resources/road-sign-concepts/"
  end

  match "/road-sign-concept-status/*path" do
    Proxy.forward conn, path, "http://resources/road-sign-concept-status/"
  end

  match "/road-sign-concept-status-codes/*path" do
    Proxy.forward conn, path, "http://resources/road-sign-concept-status-codes/"
  end

  match "/road-sign-categories/*path" do
    Proxy.forward conn, path, "http://resources/road-sign-categories/"
  end


  # Errors
  match "/*", %{ last_call: true } do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end


end
