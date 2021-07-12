(in-package :mu-cl-resources)

(define-resource homes ()
  :class (s-prefix "schema:House")
  :properties `((:address :string ,(s-prefix "schema:Address")))
  :has-many `((inhabitants :via ,(s-prefix "schema:inhabitants")
                      :as "inhabitants"))
  :resource-base (s-url "http://mu.semte.ch/services/github/samvdkris/home-service/homes/")
  :on-path "homes")


(define-resource inhabitants ()
  :class (s-prefix "foaf:Person")
  :properties `((:name :string ,(s-prefix "foaf:name")))
  :resource-base (s-url "http://mu.semte.ch/services/github/samvdkris/home-service/inhabitants/")
  :on-path "inhabitants")
