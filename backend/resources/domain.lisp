(in-package :mu-cl-resources)

(defparameter *include-count-in-paginated-responses* t)

; fixes bug in sorting - parameter is a workaround for virtuoso behaviour (see docs) but cause problems for sorting
(defparameter *max-group-sorted-properties* nil)

(read-domain-file "domain_concepts.json")
(read-domain-file "domain_instances.json")
(read-domain-file "domain_signals.json")
(read-domain-file "domain_accidents.json")
