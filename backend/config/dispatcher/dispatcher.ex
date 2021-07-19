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



  match "/road-sign-instances/*path" do
    Proxy.forward conn, path, "http://resource/road-sign-instances/"
  end

  match "/accidents/*path" do
    Proxy.forward conn, path, "http://resource/accidents/"
  end


  # "Verkeersborden" migration microservice
  match "/road-sign-concepts/*path" do
    Proxy.forward conn, path, "http://resource/road-sign-concepts/"
  end

  match "/road-sign-concept-status/*path" do
    Proxy.forward conn, path, "http://resource/road-sign-concept-status/"
  end

  match "/road-sign-concept-status-codes/*path" do
    Proxy.forward conn, path, "http://resource/road-sign-concept-status-codes/"
  end

  match "/road-sign-categories/*path" do
    Proxy.forward conn, path, "http://resource/road-sign-categories/"
  end


  # Errors
  match "/_", %{ last_call: true } do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end


end
