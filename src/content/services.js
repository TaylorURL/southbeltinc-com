/**
 * The services list drives the services page, the services column of the
 * header, and the topic a service request is filed under, so a service added
 * here shows up in all three.
 *
 * `slug` is the anchor a customer lands on from search results and from the
 * menus, so renaming one breaks inbound links. Add and retire slugs; do not
 * rewrite them.
 *
 * Each service carries its own `cta`, because a button built from the service
 * name reads badly for the longer ones, and its `topic`, which is the subject a
 * request opened from that button is filed under. `groups` are the lists the
 * service page sets beside the prose; each has a Title Case heading and
 * sentence-case items. `link` is an optional second way in, beside the button.
 *
 * The order is the order of emphasis. The services marked `featured` are the
 * ones the company leads with, so they come first here, open the services
 * page, and are the cards the home page carries under the hero, each with the
 * short `eyebrow` that sits over its name there.
 */

import { company } from './company.js';

export const services = [
  {
    slug: 'plant-service-troubleshooting',
    name: 'Plant Servicing and Troubleshooting',
    eyebrow: 'Field Service',
    featured: true,
    summary:
      'Technicians who come out to your plant, find out why it is down or running poorly, and get it back into production.',
    description: [
      `Southbelt has been servicing concrete batch plants since ${company.foundedYear}. When a plant stops, slows down or starts acting up, our technicians come to the site, track the trouble to its cause, and fix it there.`,
      'We service the concrete and material handling equipment you already run, and the parts a fix needs come from Southbelt stock at three Texas yards.',
    ],
    photo: 'field-truck',
    photoAlt:
      'A Southbelt service truck at a job site, with two crew members working at its bed beside an aggregate pile',
    groups: [
      {
        title: 'Plant Service',
        items: [
          'Service calls at your plant',
          'Troubleshooting that finds the cause, not just the symptom',
          'Qualified technicians',
          'Parts from yards in Houston, San Marcos and Dallas',
        ],
      },
    ],
    cta: { label: 'Request a Service Call', topic: 'service' },
  },
  {
    slug: 'parts-ordering',
    name: 'Parts Ordering',
    eyebrow: 'Parts Counter',
    featured: true,
    summary:
      'Bearings, motors, pneumatics, pumps, belting and the rest of the plant, ordered as one list and sourced for you when it is not on the shelf.',
    description: [
      'Build a list against your plant, with the part number, brand and the plant each part goes on, and send it as one request. A sales rep reaches out in the order requests come in.',
      'Our sales professionals and technicians are on standby to help with your orders. Should an item be absent from our stock, we can procure it for you.',
    ],
    photo: 'parts-counter',
    photoAlt: 'The Southbelt parts counter, with shelving of stock behind it',
    groups: [
      {
        title: 'Ordering Parts',
        items: [
          'One quote list for every part on the job',
          'Part number, brand and plant on each line',
          'Items not in stock procured for you',
          'Stock at yards in Houston, San Marcos and Dallas',
        ],
      },
    ],
    cta: { label: 'Order Parts', topic: 'parts' },
    link: { to: '/parts', label: 'Browse the Parts Catalog' },
  },
  {
    slug: 'conveyor-belting',
    name: 'Vulcanized Belt Installation',
    eyebrow: 'Conveyor Belting',
    featured: true,
    summary:
      'Conveyor belting spliced by vulcanization and installed on your conveyor, from a large belting inventory, 24/7.',
    description: [
      'Southbelt has full vulcanization and installation capabilities for conveyor belting. A vulcanized splice bonds the two ends of the belt into one continuous piece, and our crew installs it on the conveyor it runs on.',
      'Belting comes from a large inventory, with a full line of conveyor parts and accessories, and conveyor service is available 24/7.',
    ],
    photo: 'belting-racks',
    photoAlt: 'A Southbelt employee pulling stock from racks of conveyor belting in the warehouse',
    groups: [
      {
        title: 'Belt Installation',
        items: [
          'Full vulcanization and installation capabilities',
          'Large belting inventory',
          'A full line-up of conveyor parts and accessories',
          '24/7 availability',
        ],
      },
    ],
    cta: { label: 'Request Belt Installation', topic: 'belting' },
    download: {
      href: '/brochures/southbelt-belting-and-line-card.pdf',
      label: 'Download the Belting Flyer',
    },
  },
  {
    slug: 'repairs',
    name: 'Repairs',
    summary:
      'Emergency repairs on all equipment by qualified technicians, with quick turnaround and 24/7 availability.',
    description: [
      'Southbelt performs repairs on all equipment for the concrete and material handling industry. Downtime is costly, so the work is aimed at getting the plant back to production with as little disruption as possible.',
      'Our technicians use the proper tools and equipment, and we aim to leave each machine more resilient and efficient than it was before the repair.',
    ],
    photo: 'blower-repair',
    photoAlt: 'A technician in a hard hat working on a dry bulk blower in the Southbelt warehouse',
    groups: [
      {
        title: 'Repair Service',
        items: [
          'Qualified technicians',
          'Emergency repairs',
          'Quick turnaround',
          '24/7 availability',
        ],
      },
    ],
    cta: { label: 'Request a Repair', topic: 'repair' },
  },
  {
    slug: 'preventative-maintenance',
    name: 'Preventative Maintenance',
    summary:
      'Weekly or monthly maintenance plans built around your plant, to cut downtime and extend equipment life.',
    description: [
      'The best way to avoid downtime and extend the life of your equipment is to maintain it before it fails. Our team manages preventative maintenance on a schedule that fits your facility, weekly or monthly.',
      'Tell us about your plant and we will put together a maintenance plan that works for it.',
    ],
    photo: 'maintenance-team',
    photoAlt: 'Two Southbelt staff looking over blower units in the warehouse',
    groups: [
      {
        title: 'Every Visit Covers',
        items: [
          'Proper lubrication, to reduce wear and tear',
          'Belt adjustment, for performance and longer belt life',
          'Roller adjustment, to keep operation precise and avoid breakdowns',
        ],
      },
      {
        title: 'What a Plan Gives You',
        items: [
          'Compliance and safety',
          'A maintenance plan made for your plant',
          'Longer equipment life',
          'Less downtime',
        ],
      },
    ],
    cta: { label: 'Set Up a Maintenance Plan', topic: 'maintenance' },
  },
  {
    slug: 'plant-manufacturing',
    name: 'Plant Manufacturing',
    summary:
      'New plants, modifications to existing ones, and plant equipment, managed from procurement to final inspection.',
    description: [
      'Southbelt manages the whole plant manufacturing process: procurement, developing the bulk handling systems, and overseeing construction from inception to final inspections.',
      'Whether it is new construction, a modification to an existing plant, or a specific piece of plant equipment, the work is done by our master fabricators and welders.',
    ],
    photo: 'plant-structure',
    photoAlt: 'A crew member in a hard hat and safety vest under the steel of a batch plant',
    groups: [
      {
        title: 'Plant Manufacturing Projects',
        items: [
          'Southbelt stationary batch plant',
          'Portable pugmill systems',
          'Bin and scale replacement solutions',
          'Cement slurry systems',
          'Barge clam shell hopper conveying systems',
          'Ice auger and decumulative plant solutions',
          'New storage silos and conveying systems for precast yards',
        ],
      },
      {
        title: 'What to Settle Before You Build',
        items: [
          'Site selection: space for the plant, employee parking and loading docks',
          'Permits: local zoning laws and site plan approvals',
          'Financing: loans, grants and tax increment financing',
          'Design: the room and space the plant needs, balanced with how it looks',
          'Staffing: a general contractor or a construction manager',
          'Scheduling: a realistic timeline against performance and budget',
          'Equipment: the construction machinery and plant equipment to procure',
          'Expansion: room in the first plan for what comes later',
          'Specifications: building materials, electrical needs and structure',
          'Builder: a reputable partner to see the project through',
        ],
      },
    ],
    cta: { label: 'Talk About a Plant', topic: 'plant' },
  },
  {
    slug: 'fabrication',
    name: 'Fabrication',
    summary:
      'Plant, silo and tank, structural and custom fabrication for the concrete and industrial industries.',
    description: [
      'We custom fabricate plants, tanks and structures to your requirements and specifications, and we can handle the whole fabrication process, from design to construction.',
      'Batch plants are designed and fabricated with parameters set around your workflow. Silos and tanks get the systems and supports that let them hold more and perform better. Structural work fits the layout of the plant you already have.',
    ],
    photo: 'welders-shop',
    photoAlt:
      'A welder working inside a steel frame on the floor of the Southbelt fabrication shop',
    groups: [
      {
        title: 'Batch Plant Fabrication',
        items: [
          'Custom batch plants built to your parameters',
          'For construction, food processing, chemical, coal and cement work',
        ],
      },
      {
        title: 'Silo and Tank Fabrication',
        items: [
          'Dust collection systems',
          'Airlocks',
          'Custom structures',
          'Custom supports',
          'Transfer systems',
        ],
      },
      {
        title: 'Structural and Custom Fabrication',
        items: [
          'Loading hoods',
          'Scales',
          'Tanks and vessels',
          'Industrial hoppers',
          'Custom containers',
          'Platforms',
        ],
      },
    ],
    cta: { label: 'Request Fabrication', topic: 'fabrication' },
  },
];

/** Lookup by slug, for the service a request names. */
export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

/** The services the company leads with, in the order above. */
export const featuredServices = services.filter((service) => service.featured);
