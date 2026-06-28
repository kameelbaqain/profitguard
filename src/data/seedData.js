export const seedSuppliers = [
  {
    id: 'sup-green-valley',
    name_en: 'Green Valley Foods',
    name_ar: 'أغذية الوادي الأخضر',
    contact_person: 'Omar Haddad',
    phone: '+962 7 9000 1122'
  },
  {
    id: 'sup-levant-pack',
    name_en: 'Levant Packaging',
    name_ar: 'تغليف المشرق',
    contact_person: 'Rania Saleh',
    phone: '+962 7 8888 4455'
  },
  {
    id: 'sup-amman-dairy',
    name_en: 'Amman Dairy Co.',
    name_ar: 'شركة ألبان عمان',
    contact_person: 'Khaled Nassar',
    phone: '+962 6 555 2040'
  }
];

export const seedItems = [
  {
    id: 'item-rice-kg',
    supplier_id: 'sup-green-valley',
    item_name_en: 'Basmati Rice',
    item_name_ar: 'أرز بسمتي',
    unit: 'kg'
  },
  {
    id: 'item-oil-liter',
    supplier_id: 'sup-green-valley',
    item_name_en: 'Sunflower Oil',
    item_name_ar: 'زيت دوار الشمس',
    unit: 'liter'
  },
  {
    id: 'item-box-small',
    supplier_id: 'sup-levant-pack',
    item_name_en: 'Small Delivery Box',
    item_name_ar: 'صندوق توصيل صغير',
    unit: 'box'
  },
  {
    id: 'item-milk-liter',
    supplier_id: 'sup-amman-dairy',
    item_name_en: 'Fresh Milk',
    item_name_ar: 'حليب طازج',
    unit: 'liter'
  }
];

export const seedInvoices = [
  {
    id: 'inv-seed-1',
    supplier_id: 'sup-green-valley',
    item_id: 'item-rice-kg',
    quantity: 90,
    unit_price_jod: 0.82,
    date_logged: '2026-06-03',
    previous_unit_price_jod: null,
    price_change_percent: 0,
    price_status: 'stable',
    batch_loss_jod: 0
  },
  {
    id: 'inv-seed-2',
    supplier_id: 'sup-green-valley',
    item_id: 'item-rice-kg',
    quantity: 120,
    unit_price_jod: 0.87,
    date_logged: '2026-06-16',
    previous_unit_price_jod: 0.82,
    price_change_percent: 6.0975609756,
    price_status: 'spike',
    batch_loss_jod: 6
  },
  {
    id: 'inv-seed-3',
    supplier_id: 'sup-levant-pack',
    item_id: 'item-box-small',
    quantity: 200,
    unit_price_jod: 0.11,
    date_logged: '2026-06-18',
    previous_unit_price_jod: null,
    price_change_percent: 0,
    price_status: 'stable',
    batch_loss_jod: 0
  },
  {
    id: 'inv-seed-4',
    supplier_id: 'sup-amman-dairy',
    item_id: 'item-milk-liter',
    quantity: 75,
    unit_price_jod: 0.48,
    date_logged: '2026-06-22',
    previous_unit_price_jod: null,
    price_change_percent: 0,
    price_status: 'stable',
    batch_loss_jod: 0
  }
];
