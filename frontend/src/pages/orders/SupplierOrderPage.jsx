import React from 'react';
import SupplierOrders from '../../components/orders/supplier/SupplierOrders';
import SupplierOrderCount from '../../components/orders/supplier/SupplierOrderCount';
import HighestOrderValue from '../../components/orders/supplier/HighestOrderValue';
import TopOrderedProducts from '../../components/orders/supplier/TopOrderedProducts';
import { motion } from 'framer-motion';

export default function SupplierOrderPage() {
  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-1">
            <SupplierOrderCount />
          </div>
          <div className="md:col-span-1">
            <HighestOrderValue />
          </div>
          <div className="md:col-span-1">
            <TopOrderedProducts />
          </div>
        </div>
        
        {/* Orders List */}
        <SupplierOrders />
      </motion.div>
    </div>
  );
}