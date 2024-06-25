
ALTER TABLE `suppliers` CHANGE `id` `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT;
CREATE TABLE purchase_msts (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  purchase_uid varchar(100) NOT NULL,
  supplier_id int(11) unsigned NOT NULL,
  purchase_date date NOT NULL,
  total_cost decimal(10,2) NOT NULL,
  status enum('ordered','received','canceled') DEFAULT 'ordered',
  created_by int(11) DEFAULT NULL,
  updated_by int(11) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY purchase_uid (purchase_uid),
  KEY purchase_msts_ibfk_1 (supplier_id),
  CONSTRAINT purchase_msts_ibfk_1 FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE purchase_chds (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  purchase_mst_id int(11) unsigned NOT NULL,
  product_v_id int(11) unsigned NOT NULL,
  quantity int(11) NOT NULL,
  price decimal(10,2) NOT NULL,
  total_cost decimal(10,2) NOT NULL,
  purchase_date date NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  created_by int(11) DEFAULT NULL,
  updated_by int(11) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY purchase_chds_ibfk_1 (product_v_id),
  KEY purchase_chds_ibfk_2 (purchase_mst_id),
  CONSTRAINT purchase_chds_ibfk_1 FOREIGN KEY (product_v_id) REFERENCES product_variant_prices (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT purchase_chds_ibfk_2 FOREIGN KEY (purchase_mst_id) REFERENCES purchase_msts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE stock_msts (
  id int(11) NOT NULL AUTO_INCREMENT,
  product_v_id int(10) unsigned DEFAULT NULL,
  quantity int(11) NOT NULL,
  last_updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  created_by int(11) DEFAULT NULL,
  updated_by int(11) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY product_v_id (product_v_id),
  CONSTRAINT stock_msts_ibfk_1 FOREIGN KEY (product_v_id) REFERENCES product_variant_prices (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE stock_chds (
  id int(11) NOT NULL AUTO_INCREMENT,
  product_v_id int(11) unsigned DEFAULT NULL,
  quantity int(11) NOT NULL,
  movement_type enum('addition','removal') NOT NULL,
  movement_add_id int(11) DEFAULT NULL COMMENT 'PURCHASES ID',
  movement_remove_id int(11) DEFAULT NULL COMMENT 'SALES ID',
  movement_date timestamp NOT NULL DEFAULT current_timestamp(),
  created_by int(11) DEFAULT NULL,
  updated_by int(11) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY stock_chds_ibfk_1 (product_v_id),
  CONSTRAINT stock_chds_ibfk_1 FOREIGN KEY (product_v_id) REFERENCES product_variant_prices (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE pur_pay_details (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  pay_trans_no varchar(150) NOT NULL,
  purchase_mst_id int(11) unsigned NOT NULL,
  pay_total decimal(10,2) NOT NULL,
  pay_date date NOT NULL,
  pay_by varchar(150) DEFAULT NULL,
  trxID varchar(150) DEFAULT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  created_by int(11) DEFAULT NULL,
  updated_by int(11) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY pay_trans_no (pay_trans_no),
  KEY pur_pay_details_ibfk_1 (purchase_mst_id),
  CONSTRAINT pur_pay_details_ibfk_1 FOREIGN KEY (purchase_mst_id) REFERENCES purchase_msts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;