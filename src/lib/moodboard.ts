export type MoodboardReference = {
	title: string;
	creator: string;
	image: string;
	source: string;
	note: string;
};

export type MoodboardPrompt = {
	slug: string;
	label: string;
	prompt: string;
	references: MoodboardReference[];
};

export const moodboardUpdated = 'August 18, 2026';

// Remote image links keep the local reference shelf quick to curate and free of binary assets.
export const moodboardPrompts: MoodboardPrompt[] = [
	{
		slug: 'digital-type-as-art',
		label: 'Digital type as art',
		prompt:
			'Contemporary digital posters where letters become the image through distortion, dimension, motion, and density.',
		references: [
			{
				title: 'Vitrium Opus',
				creator: 'Ion Lucin',
				image:
					'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/13c21b196367641.661ec14a892b6.jpg',
				source:
					'https://www.behance.net/gallery/196367641/Vitrium-Opus-3D-Glass-Typography-Posters',
				note: 'A recognizable word is sliced into displaced glass sections while its outer silhouette stays readable.'
			},
			{
				title: 'Typoster Arabic',
				creator: 'Muhamed Ghareb',
				image:
					'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/60c681225041439.6816246eeaabb.jpg',
				source: 'https://www.behance.net/gallery/225041439/Typoster-Arabic',
				note: 'Arabic letterforms become stacked architectural slabs, with depth and color structuring the phrase.'
			},
			{
				title: "I Don't Need to Make Sense",
				creator: 'Semsa Toprak',
				image:
					'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d8080e239490459.692a1c34cefb3.png',
				source:
					'https://www.behance.net/gallery/239490459/I-Dont-Need-to-Make-Sense-Visual-Typographic-Series',
				note: 'A narrow editorial headline collides with oversized liquid chrome, creating hierarchy through material contrast.'
			},
			{
				title: 'Graphic Experiments',
				creator: 'Kseniia Stavrova',
				image:
					'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/cd56f6197848001.6637ab16b0309.png',
				source: 'https://www.behance.net/gallery/197848001/Graphic-Experiments',
				note: 'Overlapping strings, clipped frames, and misregistration create density without supporting imagery.'
			},

			{
				title: 'Experimental Typography',
				creator: 'Nick Ugre',
				image:
					'https://cdn.dribbble.com/userupload/31781692/file/original-a2ba61af41dcd24e694759847fd54f88.png',
				source: 'https://dribbble.com/shots/15685832-Experimental-Typography',
				note: 'Oversized letter fragments cross the poster boundaries so repetition implies a larger modular system.'
			},
			{
				title: 'Prototype 1st, Posters + 3D Type',
				creator: 'Erika Tarte',
				image:
					'https://cdn.dribbble.com/userupload/42262440/file/original-de39ca8bcf7315ad766fb77b0f38a18c.png',
				source: 'https://dribbble.com/shots/6483147-Prototype-1st-Posters-3D-Type',
				note: 'Fasteners and material layers turn letterforms into engineered objects instead of printed signs.'
			},
			{
				title: 'Always Crashing in the Same Car',
				creator: 'Keith A Curts',
				image:
					'https://cdn.dribbble.com/userupload/14541259/file/original-78acb2c4698d5168ddf71864ad1c3d93.jpg',
				source: 'https://dribbble.com/shots/24159193-ALWAYS-CRASHING-IN-THE-SAME-CAR',
				note: 'Repeated hand-drawn text wraps a figurative volume until language becomes texture and anatomy.'
			},
			{
				title: 'Distorted Typography Poster',
				creator: 'Mariam Ambokadze',
				image:
					'https://cdn.dribbble.com/userupload/26019973/file/original-56958b8b78832c80f3630bd585df9e03.jpg',
				source: 'https://dribbble.com/shots/9913253-Distorted-Typography-Poster',
				note: 'Directional warping, blur, and metallic gradients imply depth without conventional 3D rendering.'
			},
			{
				title: 'Machine Experimental Typographic Poster',
				creator: 'Sam Sheridan',
				image:
					'https://cdn.dribbble.com/userupload/27616524/file/original-0551e6dcb3184a106bb39f00e7124807.png',
				source: 'https://dribbble.com/shots/12073540-Machine-Experimental-Typographic-Poster',
				note: 'Extreme compression and noisy reproduction make type read like encoded machinery before language.'
			},
			{
				title: 'Shatter Poster',
				creator: 'Maunna',
				image:
					'https://cdn.dribbble.com/userupload/24881734/file/still-88604c9b184e7d6f24c1edaae2813e41.png',
				source: 'https://dribbble.com/shots/7194139-Shatter-Poster-Kinetic-Type',
				note: 'A repeated word breaks into moving planes so the negative spaces become part of the typography.'
			},
			{
				title: 'Experimental Type',
				creator: 'Andreas Kuhnen',
				image:
					'https://cdn.dribbble.com/userupload/25149421/file/still-5a30f3d3bf50304f18c1c12cb826d169.png',
				source: 'https://dribbble.com/shots/7807111-Experimental-Type',
				note: 'Synchronized distortion treats the poster surface as elastic material and the letters as reactive objects.'
			},
			{
				title: 'Typographic Posters',
				creator: 'Elizaveta Shulga',
				image:
					'https://cdn.dribbble.com/userupload/11494818/file/original-b56cc615bcfcc7990a33b57055189c3e.png',
				source: 'https://dribbble.com/shots/23088070-Typographic-posters',
				note: 'One narrow display face creates a family through scale, rotation, gradients, and overlap.'
			},
			{
				title: 'Kinetic Typography, Part I',
				creator: 'Jordan Hughes',
				image:
					'https://cdn.dribbble.com/userupload/25046056/file/still-0c151e97cb110a925a44b608ff69165c.png',
				source: 'https://dribbble.com/shots/7472593-Kinetic-typography-part-I',
				note: 'A repeated phrase wraps an implied surface, building volume from type, scale, and perspective alone.'
			},
			{
				title: 'Typographic Posters for GitHub',
				creator: 'Nicolas Solerieu / GitHub',
				image:
					'https://cdn.dribbble.com/userupload/2552786/file/original-71f3d8abdf0648382fb533ae16d19036.png',
				source: 'https://dribbble.com/shots/17937394-Typographic-posters',
				note: 'A disciplined type system stays forceful through radical scale shifts, rotation, cropping, and rhythm.'
			},
			{
				title: 'Spatial Festival 2025',
				creator: 'SMLXL / Mallandrich',
				image: 'https://d2z00kf51ll94q.cloudfront.net//archive/2026/large/TDC72_CD001G_1.jpg',
				source: 'https://www.oneclub.org/awards/tdcawards/-award/64960/spatial-festival-2025/',
				note: 'Typography is projected through constructed 3D space so perspective and clipping become composition.'
			},
			{
				title: 'Unveil',
				creator: 'Des Wade / Johnson Controls',
				image: 'https://d2z00kf51ll94q.cloudfront.net//archive/2026/media/TDC72_CD017S_7.jpg',
				source: 'https://www.oneclub.org/awards/tdcawards/-award/64976/unveil/',
				note: 'Thousands of words form a tonal veil, functioning as readable content, texture, and image at once.'
			},
			{
				title: 'Sorrow Trilogy Poetry Show',
				creator: 'Yufeng Han Design / HYF Studio',
				image: 'https://d2z00kf51ll94q.cloudfront.net//archive/2026/media/TDC72_CD018S_1.jpg',
				source:
					'https://www.oneclub.org/awards/tdcawards/-award/64977/2024-sorrow-trilogy-poetry-show/',
				note: 'Stretched Chinese characters become a viscous field where calligraphic form carries emotion.'
			},
			{
				title: 'Lupu Pick',
				creator: 'Sam Steiner',
				image:
					'https://images.typographicposters.com/poster/samsteiner/samsteiner-poster-661f94bb9aa6bb71e7360a09.jpg',
				source: 'https://www.typographicposters.com/poster/661f94c2660a1d4715377126',
				note: 'Repeated condensed forms create an impossible black-and-white city around a central information void.'
			}
		]
	},
	{
		slug: 'annual-reports-before-dashboards',
		label: 'Annual reports before dashboards',
		prompt:
			'Corporate reports that had to make the company legible, desirable, and human through print alone.',
		references: [
			{
				title: 'Apple Computer annual report, 1982',
				creator: 'Apple Computer',
				image: 'https://cdn.rrauction.com/auction/536/3393252_1.jpg',
				source:
					'https://www.rrauction.com/auctions/lot-detail/339325205363030-steve-jobs-signed-annual-report/',
				note: 'A rough central mark and restrained type leave enough space for one human gesture to carry the cover.'
			},
			{
				title: 'Apple Computer annual report, 1983',
				creator: 'Apple Computer',
				image: 'https://cdn.rrauction.com/auction/698/3489973_1.jpg',
				source:
					'https://www.rrauction.com/auctions/lot-detail/348997306984111-apple-computer-collection-of-10-annual-and-quarterly-reports/',
				note: 'A deliberately rough competitive diagram makes corporate strategy feel immediate instead of polished.'
			},
			{
				title: 'Apple Computer annual report, 1984',
				creator: 'Apple Computer',
				image:
					'https://modernism101.com/wp-content/uploads/2021/11/apple_annual_report_1984_00.jpg',
				source:
					'https://modernism101.com/products-page/graphic-design/apple-computer-inc-annual-report-1984-cupertino-ca-apple-computer-inc-1984-steven-p-jobs-chairman/',
				note: 'One culturally loaded campaign image takes over the cover, with almost no separate corporate framing.'
			},
			{
				title: 'Apple Computer annual report, 1985',
				creator: 'Apple Computer',
				image: 'https://cdn.rrauction.com/auction/714/3497711_2.jpg',
				source:
					'https://www.rrauction.com/auctions/lot-detail/349771107146242-apple-computer-collection-of-8-annual-and-quarterly-reports-from-the-collection-of-clement-mok/',
				note: 'The cover behaves like an interface: one short narrative, wide margins, and a sentence highlighted as selection.'
			},
			{
				title: 'HyperCard annual report supplement, 1987',
				creator: 'Hugh Dubberly, Doris Mitsch, Ron Fernandez, Vic Zaud, Paul Gilman / Apple',
				image:
					'https://clementmok.com/wp-content/uploads/2023/08/HyperCard-Tabloid_spread1-1024x791.jpg',
				source: 'https://clementmok.com/apple-hypercard/',
				note: 'Monumental headlines, modular columns, and interface pictograms make a print spread feel nonlinear.'
			},
			{
				title: 'Walt Disney Productions annual report, 1972',
				creator: 'Walt Disney Productions / Internet Archive',
				image: 'https://archive.org/download/wdp-annual-report-1972/page/n0.jpg',
				source: 'https://archive.org/details/wdp-annual-report-1972',
				note: 'Mickey ears, a tiled globe, and a gold 50 collapse an anniversary story into one compact emblem.'
			},
			{
				title: 'Walt Disney Productions annual report, 1979',
				creator: 'Walt Disney Productions / Internet Archive',
				image: 'https://archive.org/download/wdp-annual-report-1979/page/n0.jpg',
				source: 'https://archive.org/details/wdp-annual-report-1979',
				note: 'A blue-black collision of Matterhorn and castle turns a theme park into a corporate monument.'
			},
			{
				title: 'Looking to New Horizons, 1983',
				creator: 'Walt Disney Productions / Internet Archive',
				image: 'https://archive.org/download/wdp-annual-report-1983/page/n0.jpg',
				source: 'https://archive.org/details/wdp-annual-report-1983',
				note: 'A family facing a radiant futurist city makes technological optimism the literal horizon.'
			},
			{
				title: 'The Walt Disney Company annual report, 1989',
				creator: 'John Jensen / The Walt Disney Company',
				image:
					'https://archive.org/download/walt-disney-company-dis-annual-report-1989/page/n0.jpg',
				source: 'https://archive.org/details/walt-disney-company-dis-annual-report-1989',
				note: 'Photos, tickets, books, toys, and souvenirs turn corporate history into a loose museum-wall chronology.'
			},
			{
				title: 'The Walt Disney Company annual report, 1994',
				creator: 'John Jensen, Glen Keane / The Walt Disney Company',
				image:
					'https://archive.org/download/walt-disney-company-dis-annual-report-1994/page/n0.jpg',
				source: 'https://archive.org/details/walt-disney-company-dis-annual-report-1994',
				note: 'A nearly full-bleed character portrait replaces corporate symbolism with direct emotional intimacy.'
			},
			{
				title: 'The Walt Disney Company annual report, 2004',
				creator: 'The Walt Disney Company / Internet Archive',
				image: 'https://archive.org/download/dar2004/page/n0.jpg',
				source: 'https://archive.org/details/dar2004',
				note: 'A dense anniversary montage presents decades of characters as one continuous visual universe.'
			},
			{
				title: 'Esso Standard S.A.F. rapport annuel, 1961',
				creator: 'A. Pasternak / Esso Standard S.A.F.',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1961/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1961',
				note: 'A dense field of cellular forms is disciplined by one technical inset and a rigorously aligned title block.'
			},
			{
				title: 'Esso Standard S.A.F. rapport annuel, 1965',
				creator: 'Bruno Le Sourd / Esso Standard S.A.F.',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1965/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1965',
				note: 'Pumps, gauges, signs, and mascots become a playful vocabulary through black linework and spot color.'
			},
			{
				title: 'Esso Standard S.A.F. rapport annuel, 1968',
				creator: 'Michel Rohmer / Esso Standard S.A.F.',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1968/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1968',
				note: 'An enlarged identity and photographic motion blur make a static corporate mark feel environmental.'
			},
			{
				title: 'Esso Standard S.A.F. rapport annuel, 1969',
				creator: 'Esso Standard S.A.F. / Internet Archive',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1969/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1969',
				note: 'Oversized letters built from colored dots suggest signage, data pixels, and perspective at once.'
			},
			{
				title: 'Esso Standard S.A.F. rapport annuel, 1972',
				creator: 'Esso Standard S.A.F. / Internet Archive',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1972/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1972',
				note: 'An actual energy-flow diagram becomes the cover, with labeled radial streams converging on light.'
			},
			{
				title: 'Esso S.A.F. rapport annuel, 1978',
				creator: 'Esso S.A.F. / Internet Archive',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1978/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1978',
				note: 'Ships, refineries, research, products, and brand symbols form an ornate corporate taxonomy.'
			},
			{
				title: 'Esso S.A.F. rapport annuel, 1989',
				creator: 'Esso S.A.F. / Internet Archive',
				image: 'https://archive.org/download/esso-france-rapport-annuel-1989/page/n0.jpg',
				source: 'https://archive.org/details/esso-france-rapport-annuel-1989',
				note: 'One emphasized product tile sits inside a field of outline icons, paired with an oversized year.'
			},
			{
				title: 'Container Corporation of America annual report, 1966',
				creator: 'John Rieben / Container Corporation of America',
				image:
					'https://chicagodesignarchive.org/sites/default/files/styles/project_main/public/2021-11/21A-40a.tif.jpg',
				source: 'https://chicagodesignarchive.org/project/21a-40a',
				note: 'Abstract geometry translates the company’s structural logic without depicting its products literally.'
			},
			{
				title: 'Westinghouse annual report, 1970',
				creator: 'Paul Rand / Westinghouse',
				image:
					'https://assets.paulrand.design/Works/Westinghouse/Annual%20Reports/1970/Web/Westinghouse%20Annual%20Report%201970%2001.webp',
				source: 'https://www.paulrand.design/work/Westinghouse.html',
				note: 'Geometric characters humanize a technical corporation while staying inside a rigorous identity system.'
			},
			{
				title: 'IBM annual report, 1979',
				creator: 'IBM Design Program',
				image: 'https://assets.ibm.com/is/image/ibm/pr_ibm_annualreport_1979-copy?dpr=off',
				source: 'https://www.ibm.com/history/design-program',
				note: 'A repeatable micro-grid turns financial movement into the identity rather than added decoration.'
			},
			{
				title: 'Inland Steel annual report, 1983',
				creator: 'Norman Perman / Inland Steel',
				image:
					'https://chicagodesignarchive.org/sites/default/files/styles/project_main/public/projects/04A-55.tif.jpg',
				source: 'https://chicagodesignarchive.org/project/04a-55',
				note: 'Typography is treated like industrial material with depth and atmosphere, not a label over an image.'
			},
			{
				title: 'Dow Chemical annual report, 1986',
				creator: 'John Rieben, Howe & Associates / Dow Chemical',
				image:
					'https://chicagodesignarchive.org/sites/default/files/styles/project_main/public/2021-11/21A-36.tif.jpg',
				source: 'https://chicagodesignarchive.org/project/21a-36',
				note: 'Torn edges, layered strips, and controlled color express momentum without arrows or speed lines.'
			},
			{
				title: 'CBOE annual report, 2003',
				creator: 'Steve Liska, Kim Fry / Chicago Board Options Exchange',
				image:
					'https://chicagodesignarchive.org/sites/default/files/styles/project_main/public/2018-11/18F-56.tif.jpg',
				source: 'https://chicagodesignarchive.org/project/18f-56',
				note: 'A simple target overlay imposes strategic focus on otherwise chaotic documentary photography.'
			}
		]
	},
	{
		slug: 'type-as-image',
		label: 'Type as image',
		prompt: 'Letters that carry motion, volume, or atmosphere before the words have been read.',
		references: [
			{
				title: 'Il pleut',
				creator: 'Guillaume Apollinaire',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/9/9b/Guillaume_Apollinaire_-_Calligramme_-_Il_pleut.png',
				source:
					'https://commons.wikimedia.org/wiki/File:Guillaume_Apollinaire_-_Calligramme_-_Il_pleut.png',
				note: 'Five sloping text streams turn reading into the physical sensation of rain.'
			},
			{
				title: 'Dada Matinee',
				creator: 'Theo van Doesburg',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/5/50/Theo_van_Doesburg_Dadamatin%C3%A9e.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:Theo_van_Doesburg_Dadamatin%C3%A9e.jpg',
				note: 'Rotated letterforms and abrupt scale changes make the page feel directional.'
			},
			{
				title: 'Parole in liberta',
				creator: 'Filippo Tommaso Marinetti',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/c/c4/Filippo_Tommaso_Marinetti_-_Parole_in_Liberta_1932_B.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Filippo_Tommaso_Marinetti_-_Parole_in_Liberta_1932_B.jpg',
				note: 'Stretched words and radial composition give printed language speed and sound.'
			},
			{
				title: 'Voodoo Macbeth',
				creator: 'Anthony Velonis / WPA Federal Theatre Project',
				image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Voodoo-Macbeth-Poster.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:Voodoo-Macbeth-Poster.jpg',
				note: 'Condensed lettering and hard silkscreen contrast turn the title into architecture.'
			}
		]
	},
	{
		slug: 'imperfect-systems',
		label: 'Imperfect systems',
		prompt:
			'Grids made human by use: fading ink, coarse stock, corrections, folds, and uneven pressure.',
		references: [
			{
				title: 'Florentine ledger, page 143',
				creator: 'Temple University Libraries / DPLA',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/6/6a/Ledger_of_debtors_and_creditors_-_manuscript_-_DPLA_-_e50c9ae2aa975bb9a1bd2a848bd3e06f_%28page_143%29.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Ledger_of_debtors_and_creditors_-_manuscript_-_DPLA_-_e50c9ae2aa975bb9a1bd2a848bd3e06f_(page_143).jpg',
				note: 'Hand-drawn columns and corrections show a rigid grid becoming richer through use.'
			},
			{
				title: 'Death of Aurelio Caballero',
				creator: 'Jose Guadalupe Posada / Antonio Vanegas Arroyo',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/3/39/Broadside_relating_to_Aurelio_Cabellero_who_died_from_vomiting_MET_DP867967.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Broadside_relating_to_Aurelio_Cabellero_who_died_from_vomiting_MET_DP867967.jpg',
				note: 'Dense columns, uneven impression, and colored stock create vivid low-cost authority.'
			},
			{
				title: 'Evening cicada and spider',
				creator: 'Kitagawa Utamaro / The Met',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/f/f8/%E3%80%8E%E7%94%BB%E6%9C%AC%E8%99%AB%E6%92%B0%E3%80%8F_%E3%80%8C%E3%81%B2%E3%81%8F%E3%82%89%E3%81%97%E3%80%8D%E3%80%8C%E3%81%8F%E3%82%82%E3%80%8D-Evening_Cicada%2C_Higurashi%3B_Spider%2C_Kumo%2C_from_the_Picture_Book_of_Crawling_Creatures_%28Ehon_mushi_erami%29_MET_DP135555.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:%E3%80%8E%E7%94%BB%E6%9C%AC%E8%99%AB%E6%92%B0%E3%80%8F_%E3%80%8C%E3%81%B2%E3%81%8F%E3%82%89%E3%81%97%E3%80%8D%E3%80%8C%E3%81%8F%E3%82%82%E3%80%8D-Evening_Cicada,_Higurashi;_Spider,_Kumo,_from_the_Picture_Book_of_Crawling_Creatures_(Ehon_mushi_erami)_MET_DP135555.jpg',
				note: 'Muted pigments, paper grain, and an interrupted center fold make restraint tactile.'
			},
			{
				title: 'Bile Beans paper bag',
				creator: 'Wellcome Collection',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/b/b0/Ephemera_collection%3B_Paper_bag_advertising_Bile_Beans_Wellcome_L0030503.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Ephemera_collection;_Paper_bag_advertising_Bile_Beans_Wellcome_L0030503.jpg',
				note: 'Show-through, creases, and imperfect two-color printing turn packaging into texture.'
			}
		]
	},
	{
		slug: 'quiet-digital',
		label: 'Quiet digital',
		prompt:
			'Editorial interfaces with enough restraint that one image or one typographic move can lead.',
		references: [
			{
				title: 'A Journal on How to Wow People',
				creator: 'EY Doberman / Minimal Gallery',
				image: 'https://minimal.gallery/wp-content/uploads/2026/05/ajournalon.co_-900x500.jpg',
				source: 'https://minimal.gallery/a-journal-on-how-to-wow-people/',
				note: 'A single publication, sparse controls, and disciplined black space create focus.'
			},
			{
				title: 'SAPIENS',
				creator: 'SAPIENS / Minimal Gallery',
				image: 'https://minimal.gallery/wp-content/uploads/2023/10/sapiens-900x500.jpg',
				source: 'https://minimal.gallery/sapiens/',
				note: 'Generous blank space lets a compact masthead and story grid carry the hierarchy.'
			},
			{
				title: 'Editorial New',
				creator: 'Pangram Pangram / Locomotive / Minimal Gallery',
				image:
					'https://minimal.gallery/wp-content/uploads/2020/11/tumblr_pzka8juYto1sjvgq8o1_1280-900x500.png',
				source: 'https://minimal.gallery/editorial-new/',
				note: 'A centered specimen and peripheral controls make navigation secondary to content.'
			},
			{
				title: 'Friends of Friends',
				creator: 'Friends of Friends / Minimal Gallery',
				image: 'https://minimal.gallery/wp-content/uploads/2021/09/friends-of-friends-900x500.jpg',
				source: 'https://minimal.gallery/friends-of-friends/',
				note: 'Minimal chrome and oversized type preserve immersion in a full-bleed photograph.'
			}
		]
	},
	{
		slug: 'music-in-print',
		label: 'Music in print',
		prompt:
			'Editorial record sleeves, label ephemera, and music graphics across eras, where type, image, and print structure make sound visible.',
		references: [
			{
				title: 'May Milton',
				creator: 'Henri de Toulouse-Lautrec / Cleveland Museum of Art',
				image: 'https://openaccess-cdn.clevelandart.org/1952.10/1952.10_web.jpg',
				source: 'https://clevelandart.org/art/1952.10',
				note: 'An extreme silhouette, edge crop, and three economical colors create movement without detail.'
			},
			{
				title: 'Miss Gertrude Barrison, Cabaret Fledermaus',
				creator: 'Fritz Zeymer / The Met',
				image: 'https://images.metmuseum.org/CRDImages/dp/web-additional/DP843832.jpg',
				source: 'https://www.metmuseum.org/art/collection/search/388890',
				note: 'A narrow ornamental header compresses image and lettering, making the empty field active.'
			},
			{
				title: 'Columbia Records Supplement No. 157',
				creator: 'Barbara / Columbia Records / V&A',
				image: 'https://framemark.vam.ac.uk/collections/2018KY1818/full/1000,/0/default.jpg',
				source: 'https://collections.vam.ac.uk/item/O189742/',
				note: 'Flat orange figures and a piano silhouette give a dense record catalogue an immediate cover.'
			},
			{
				title: 'Pathé — L’enregistrement électrique le plus perfectionné',
				creator: 'A. M. Cassandre / Bedos & Cie',
				image: 'https://www.emuseum.ch/internal/media/dispatcher/49928/preview',
				source:
					'https://www.emuseum.ch/objects/49645/pathe--lenregistrement-electrique-le-plus-perfectionne',
				note: 'Record grooves, tonearm, and cable become one sweeping diagonal around a vivid center label.'
			},
			{
				title: 'Grammo Studio',
				creator: 'Siegfried Odermatt / Museum für Gestaltung Zürich',
				image: 'https://www.emuseum.ch/internal/media/dispatcher/139267/preview',
				source: 'https://www.emuseum.ch/objects/102159/grammo-studio',
				note: 'Oversized cropped grotesk breaks across a narrow foldout while tiny copy anchors the scale.'
			},
			{
				title: 'Musica viva — Schweizerische Erstaufführungen',
				creator: 'Josef Müller-Brockmann / City-Druck AG',
				image: 'https://www.emuseum.ch/internal/media/dispatcher/31929/preview',
				source:
					'https://www.emuseum.ch/objects/11329/musica-viva--dienstag-den-7-januar-1958--schweizerische',
				note: 'Changing circle sizes create musical pulse above practical copy locked to a bottom grid.'
			},
			{
				title: 'Unity — Larry Young',
				creator: 'Reid Miles / Blue Note Records',
				image:
					'https://www.moma.org/media/W1siZiIsIjMwNTQ4MSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=97ee033d77e45a68',
				source: 'https://www.moma.org/collection/works/185423',
				note: 'Oversized title typography becomes architecture beside a tightly cropped duotone portrait.'
			},
			{
				title: 'Sound — Roscoe Mitchell Sextet',
				creator: 'Sylvia Abernathy / Billy Abernathy',
				image: 'https://letterformarchive.org/wp-content/uploads/legacy/Abernathy-Mitchell.jpg',
				source: 'https://letterformarchive.org/news/laini-sylvia-abernathy/',
				note: 'Concentric rings transmit a static portrait outward through abrupt thick-thin lettering.'
			},
			{
				title: 'Sun Song — Sun Ra',
				creator: 'Laini Abernathy / Delmark Records',
				image: 'https://ids.si.edu/ids/deliveryService?id=CHSDM-295467_01-000001',
				source: 'https://www.si.edu/object/sun-song-sun-ra:chndm_2021-25-1-a_c',
				note: 'One gestural symbol nearly consumes the sleeve while a small centered title holds it steady.'
			},
			{
				title: 'My Brother the Wind proof sheet',
				creator: 'The Sun Ra Arkestra / Smithsonian NMAAHC',
				image: 'https://ids.si.edu/ids/deliveryService?id=NMAAHC-2024_11_3_001',
				source:
					'https://www.si.edu/object/proof-sheet-my-brother-wind-album-artwork:nmaahc_2024.11.3',
				note: 'One ink, irregular display lettering, and visible proofing texture create a complete world.'
			},
			{
				title: 'Jazz Jamboree 71',
				creator: 'Henryk Tomaszewski / Library of Congress',
				image: 'https://cdn.loc.gov/service/pnp/cph/3g00000/3g02000/3g02400/3g02402r.jpg',
				source: 'https://www.loc.gov/pictures/item/93504072/',
				note: 'An instrument reduced to one oversized symbol lets negative space imply projection and volume.'
			},
			{
				title: 'Solo-Concerts — Keith Jarrett',
				creator: 'B & B Wojirsch / ECM Records',
				image:
					'https://assets.fontsinuse.com/use-media/66682/upto-700xauto/69b52c30/1/jpeg/IMG_1799.jpeg',
				source: 'https://fontsinuse.com/uses/21219/keith-jarrett-solo-concerts-1',
				note: 'Centered green lettering floats on charcoal, with tiny imprint details calibrating the empty field.'
			},
			{
				title: 'Amigos — Santana',
				creator: 'Tadanori Yokoo / Columbia Records',
				image:
					'https://www.moma.org/media/W1siZiIsIjMwNTU2NiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=59cc335172db1286',
				source: 'https://www.moma.org/collection/works/185450',
				note: 'Radial symmetry and nested frames organize dense, heterogeneous imagery into controlled excess.'
			},
			{
				title: 'Hi-Fi News & Record Review, March 1977',
				creator: 'Designer unrecorded / Fonts In Use',
				image:
					'https://assets.fontsinuse.com/use-media/49028/upto-700xauto/69b51bbf/1/jpeg/5581281133_de08a7d2ac_b.jpeg',
				source: 'https://fontsinuse.com/uses/15922/hi-fi-news-andamp-record-review-march-1977',
				note: 'A heavy lowercase masthead and compressed cover lines turn technical reviewing into pop editorial.'
			},
			{
				title: 'Music of the Bhutan',
				creator: 'Ronald Clyne / Folkways Records',
				image:
					'https://assets.fontsinuse.com/static/use-media-items/175/174069/upto-700xauto/69b58fdf/FW04030.jpeg',
				source: 'https://fontsinuse.com/uses/49589/music-of-the-bhutan-album-art',
				note: 'A narrow documentary strip holds a textured field between ultra-light and emphatic display type.'
			},
			{
				title: 'Sun Bear Concerts — Keith Jarrett',
				creator: 'Barbara Wojirsch / ECM Records',
				image: 'https://ecm-server.de/audio/00422843/0042284302821/Cover_1000.webp',
				source: 'https://ecmrecords.com/product/sun-bear-concerts-keith-jarrett/',
				note: 'Extreme negative space, multilingual lettering, and a tiny imprint make the box a quiet title page.'
			},
			{
				title: 'Armed Forces — Elvis Costello',
				creator: 'Barney Bubbles / Radar Records',
				image: 'https://framemark.vam.ac.uk/collections/2011EY3334/full/1000,/0/default.jpg',
				source: 'https://collections.vam.ac.uk/item/O1192919/',
				note: 'Pulp illustration, a hard-edged sticker, and a cross-shaped fold make packaging feel assembled.'
			},
			{
				title: 'Nice Guys — Art Ensemble of Chicago',
				creator: 'Barbara Wojirsch / Isio Saba / ECM Records',
				image: 'https://ecm-server.de/audio/00422827/0042282787620/Cover_1000.webp',
				source: 'https://ecmrecords.com/product/nice-guys-art-ensemble-of-chicago/',
				note: 'A documentary contact sheet becomes editorial material under direct, contrasting handwriting.'
			},
			{
				title: 'Black Flag, Meat Puppets, Descendents, and Angst flyer',
				creator: 'Raymond Pettibon / Letterform Archive',
				image:
					'https://letterformarchive.org/wp-content/uploads/legacy/lfa_punkflyers_0005_001.jpg',
				source: 'https://letterformarchive.org/news/punk-flyers-of-san-francisco/',
				note: 'Illustration and handwritten information share one raw voice that survives photocopy reproduction.'
			},
			{
				title: 'Dazzle Ships — Orchestral Manoeuvres in the Dark',
				creator: 'Peter Saville Associates / V&A',
				image: 'https://framemark.vam.ac.uk/collections/2012FP0385/full/1000,/0/default.jpg',
				source: 'https://collections.vam.ac.uk/item/O191226/',
				note: 'Flat camouflage planes and die cuts make the contrasting inner sleeve part of the composition.'
			},
			{
				title: 'Kid A — Radiohead',
				creator: 'Stanley Donwood / Radiohead',
				image: 'https://original.fontsinuse.com/fontsinuse.com/use-images/9/9788/9788.jpeg',
				source: 'https://fontsinuse.com/uses/3270/radiohead-kid-a-album-art',
				note: 'A vast painted landscape makes the small distressed title feel remote and vulnerable.'
			},
			{
				title: 'REMIX Vol 2',
				creator: 'H5 / Pampelmousse Productions',
				image: 'https://www.emuseum.ch/internal/media/dispatcher/47151/full',
				source: 'https://www.emuseum.ch/objects/47972/remix-vol-2',
				note: 'Striped custom letters, dense black type, and a technical footer turn one yellow field into a system.'
			},
			{
				title: 'Heathen — David Bowie',
				creator: 'Barnbrook / ISO Records',
				image: 'https://barnbrook.net/wp-content/uploads/2014/09/dbhc_2002_01.jpg',
				source: 'https://barnbrook.net/work/david-bowie-heathen/',
				note: 'Inverted titles and altered eyes deliberately violate normal orientation and portrait conventions.'
			},
			{
				title: 'Once in a Lifetime — Talking Heads',
				creator: 'Stefan Sagmeister / Matthias Ernstberger',
				image: 'https://static.peeky.com/_image/2600x/6a8b25a0f4bff56954ee6f7185b8ebde.jpg',
				source: 'https://sagmeister.com/work/talking-heads/',
				note: 'A panoramic package turns unfolding and horizontal image sequencing into part of the experience.'
			},
			{
				title: 'Black Cherry — Goldfrapp',
				creator: 'Alison Goldfrapp / Mat Maitland / Gerard Saint',
				image:
					'https://bigactive.com/wp-content/uploads/2019/01/Goldfrapp_Black_Cherry_Vinyl_Portfolio-1200x801.jpg',
				source: 'https://bigactive.com/music-art-direction-design/music/goldfrapp-black-cherry/',
				note: 'Fragmented portraiture, animal imagery, decorative lettering, and tiny color accents form a controlled collage.'
			},
			{
				title: 'Rolling Stone magazine system, 2004–2006',
				creator: 'Rolling Stone design department / Fonts In Use',
				image: 'https://original.fontsinuse.com/fontsinuse.com/use-images/133/133896/133896.jpeg',
				source: 'https://fontsinuse.com/uses/38828/rolling-stone-magazine-2004-2006',
				note: 'One recurring display family changes treatment to match each story while preserving editorial continuity.'
			},
			{
				title: 'Hyperdub singles sleeve system',
				creator: 'Kode9 / Hyperdub',
				image: 'https://original.fontsinuse.com/fontsinuse.com/use-images/47/47621/47621.jpeg',
				source: 'https://fontsinuse.com/uses/15504/hyperdub-singles-2004',
				note: 'A fixed logo and information grid establish label recognition while release imagery keeps changing.'
			},
			{
				title: 'The Information — Beck',
				creator: 'Mat Maitland / Gerard Saint / Beck',
				image:
					'https://bigactive.com/wp-content/uploads/2019/01/Beck_Information_CD2_Portfolio-1728x969.jpg',
				source: 'https://bigactive.com/music-art-direction-design/music/beck-information/',
				note: 'Blank graph-paper packaging and hundreds of stickers hand art direction over to the listener.'
			},
			{
				title: 'Solo Willisau — Anthony Braxton',
				creator: 'Niklaus Troxler / Jonas Schoder',
				image: 'https://www.emuseum.ch/internal/media/dispatcher/168643/full',
				source: 'https://www.emuseum.ch/objects/125804/anthony-braxton-solo-willisau',
				note: 'Sharp geometric fragments and broken vertical lettering turn improvisation into visual rhythm.'
			},
			{
				title: 'Everything That Happens Will Happen Today',
				creator: 'Stefan Sagmeister / Richard The / Joe Shouldice / Jared Stone',
				image: 'https://static.peeky.com/_image/2600x/c8cd375d5f34706ff7e41a2d3aa891a3.jpg',
				source: 'https://sagmeister.com/work/david-byrne-and-brian-eno-everything-that-happens/',
				note: 'A circular package becomes a miniature suburban diorama with an unresolved visual narrative.'
			}
		]
	},
	{
		slug: 'downtown-editorial-systems',
		label: 'Downtown editorial systems',
		prompt:
			'Actual magazine, zine, book, and campaign design with New York downtown attitude: flash photography, blunt type, raw print texture, and grids that feel composed without feeling clean-cut.',
		references: [
			{
				title: 'Interview magazine relaunch, 2018–',
				creator: 'Richard Turley, Kurt Woerpel, Jack Vhay',
				image:
					'https://assets.fontsinuse.com/static/use-media-items/106/105214/upto-700xauto/69b550a6/Dm_O0wNXoAATgo_.jpeg',
				source: 'https://fontsinuse.com/uses/30493/interview-magazine-2018',
				note: 'A documentary portrait, an oversized conversational headline, and one handwritten accent make celebrity editorial feel immediate rather than polished.'
			},
			{
				title: 'Hobo magazine',
				creator: 'Shawn Dogimont',
				image:
					'https://assets.fontsinuse.com/use-media/48346/upto-700xauto/69b51a95/1/jpeg/hobo_01.jpeg',
				source: 'https://fontsinuse.com/uses/15759/hobo-magazine',
				note: 'Severe whitespace and an undersized text block make one unpolished photograph feel private, cinematic, and self-assured.'
			},
			{
				title: 'Make It Rain zine',
				creator: 'Jonny Lu Studio for Nick Waplington',
				image:
					'https://assets.fontsinuse.com/static/use-media-items/264/263335/upto-700xauto/69b60ac4/MAKE_IT_RAIN_7.webp',
				source: 'https://fontsinuse.com/uses/70096/nick-waplington-make-it-rain-zine',
				note: 'One direct-flash photograph floats inside a large black field, resisting both full bleed and explanatory typography.'
			},
			{
				title: 'Mushpit #10',
				creator: 'Richard Turley, Charlotte Roberts, Bertie Brandes',
				image: 'https://cdn.shopify.com/s/files/1/0514/7889/files/MUSHPIT_10_4_12_18-RT-29.jpg',
				source: 'https://magculture.com/blogs/journal/mushpit-10',
				note: 'A spare grid absorbs typewriter text, annotations, and emotionally abrupt images without sanding off their raw edges.'
			},
			{
				title: 'Sneeze #68 — Flow State',
				creator: 'Sian Chu / Sneeze',
				image: 'https://magculture.com/cdn/shop/files/Sneeze68_1200x1796.png',
				source: 'https://magculture.com/products/sneeze-68',
				note: 'Sideways bubble lettering and sticker graphics treat an oversized loose-leaf magazine like tagged street ephemera.'
			},
			{
				title: 'The Whitney Review of New Writing #7',
				creator: 'Immanuel Yang / Whitney Mallett',
				image: 'https://magculture.com/cdn/shop/files/TheWhitneyReviewofNewWriting7_1200x1733.jpg',
				source: 'https://magculture.com/products/the-whitney-review-7',
				note: 'Compressed display type, credits, a signature, and body copy turn the cover into a live editorial page instead of a poster.'
			},
			{
				title: 'Dot Dot Dot, issues 1–20',
				creator: 'Peter Bil’ak, Stuart Bertolotti-Bailey, Jürgen X. Albrecht, David Reinfurt',
				image: 'https://eyeondesign.aiga.org/wp-content/uploads/2021/05/10-DDD1-20-scaled.jpg',
				source:
					'https://eyeondesign.aiga.org/dot-dot-dot-is-the-most-influential-design-magazine-youve-never-heard-of/',
				note: 'A run of mismatched spines records the shift from contributor-led experiments toward a deliberately restricted two-column default system.'
			},
			{
				title: 'BUTT #30',
				creator: 'Gert Jonkers, Jop van Bennekom / Clifford Prince King',
				image: 'https://eyeondesign.aiga.org/wp-content/uploads/2022/05/BUTT30coverHR-602x850.jpg',
				source:
					'https://eyeondesign.aiga.org/butt-magazine-is-back-what-made-it-so-iconic-in-the-first-place/',
				note: 'A huge black masthead, powder-pink stock, sparse typewriter text, and an intimate portrait make low production feel iconic.'
			},
			{
				title: 'BLK DNM Gazette',
				creator: 'Triboro',
				image: 'https://triborodesign.com/images/1600_w/2019/11/25/blkdnm_gazette-3546.jpg',
				source: 'https://triborodesign.com/project/blk-dnm/',
				note: 'A severe monochrome wordmark, flash-fashion photography, and disposable newsprint make luxury feel street-level.'
			},
			{
				title: 'Quiet as It’s Kept — Whitney Biennial 2022',
				creator: 'Studio Lin',
				image: 'https://studiolin.org/wp-content/uploads/2022/04/6_WhitneyBiennial-2880x2214.webp',
				source: 'https://studiolin.org/projects/quiet-as-its-kept-whitney-biennial-2022/',
				note: 'Alphabetical contributor tabs become both navigation and a dense edge pattern, giving the catalog an index-like physical rhythm.'
			},
			{
				title: 'Sundance Film Festival 2024',
				creator: 'Public-Library / Massive Assembly',
				image: 'https://public-library.org/wp-content/uploads/2024/08/Festival-Poster3.jpg',
				source: 'https://public-library.org/projects/sundance-film-festival-2024/',
				note: 'A disciplined event grid sits over visibly analog backgrounds, keeping institutional information tied to DIY filmmaking.'
			},
			{
				title: 'Dog Ears',
				creator: 'Public-Library',
				image:
					'https://public-library.org/wp-content/uploads/2022/03/Public_Library-Book-Cover_Spread-Page_35-065-1920x1200.jpg',
				source: 'https://public-library.org/projects/public-library-dog-ears/',
				note: 'One sentence is repeatedly deconstructed in one typeface until iteration and process become the publication’s subject.'
			},
			{
				title: 'Horror Caviar',
				creator: 'Wkshps / Justin J Wee',
				image:
					'https://cdn.sanity.io/images/wf3kvo5h/production/83b5e9c5591d4ce799d8d675f0194d21c11ae1f5-1080x1350.jpg',
				source: 'https://wkshps.com/work/horror-caviar',
				note: 'Glossy flash photography, black voids, visceral red, and title-card typography make a cookbook behave like genre cinema.'
			},
			{
				title: 'On the Dance Floor — Spinning Out on Screen',
				creator: 'Wkshps, Claire Marie Healy / A24',
				image:
					'https://cdn.sanity.io/images/wf3kvo5h/production/341ee4c0acd0406b49dcb3ae59b0883c9cecaa02-1080x1350.jpg',
				source: 'https://wkshps.com/work/on-the-dance-floor',
				note: 'Dense and open spreads alternate like a beat while archival display type is pushed against warped newspaper typography.'
			},
			{
				title: 'Passing Through — Gordon Matta-Clark NYC Graffiti Photographs',
				creator: 'Other Means / OM Books',
				image:
					'https://othermeans.us/media/pages/other-means/597b8fbfe6-1761084905/other_means_books_passing-through_cover-1440x-q95.jpg',
				source: 'https://othermeans.us/',
				note: 'Gritty archival graffiti is framed with matter-of-fact municipal typography and restrained book construction instead of nostalgia.'
			},
			{
				title: 'Ursula magazine',
				creator: 'Common Name / Hauser & Wirth',
				image: 'https://common-name.com/wp-content/uploads/2019/10/Common_Name_05_10_20190047.jpg',
				source: 'https://common-name.com/hauser-wirth/',
				note: 'A fixed editorial skeleton holds radically different art portfolios together without forcing every issue into the same visual register.'
			},
			{
				title: 'Newsweek — A World Drawn Closer',
				creator: '2x4',
				image: 'https://2x4.org/wp-content/uploads/2026/02/Headline-1200x1132.jpg',
				source: 'https://2x4.org/work/newsweek/',
				note: 'Oversized editorial headlines, decisive red, and documentary image crops give a legacy masthead a sharper contemporary voice.'
			},
			{
				title: 'Polaroids Book 01 — New York Fashion Week F/W 2024',
				creator: 'Andrés Santana / Paige Powell',
				image:
					'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e5440f213218525.674f88a4eda94.jpg',
				source:
					'https://www.behance.net/gallery/213218525/POLAROIDS-BOOK-01-New-York-Fashion-Week-FW-2024',
				note: 'Backstage Polaroids are treated as a time capsule through loose sequencing, tactile framing, and minimal fashion-book furniture.'
			},
			{
				title: 'Surveillance Index — Edition One',
				creator: 'Studio Lin',
				image: 'https://studiolin.org/wp-content/uploads/2016/10/poster-2880x2880.webp',
				source: 'https://studiolin.org/projects/surveillance-index-edition-one/',
				note: 'Indexed surveillance stills become an austere forensic field, letting repetition and evidence replace illustration.'
			},
			{
				title: 'Roth Gallery invitations',
				creator: 'Triboro',
				image: 'https://triborodesign.com/images/1600_w/2019/10/07/ppp_10-2824.jpg',
				source: 'https://triborodesign.com/project/roth-gallery/',
				note: 'Each invitation changes material and composition while a stark typographic voice keeps the series recognizable.'
			},
			{
				title: 'Small World — Taipei Biennial 2023',
				creator: 'Wkshps',
				image:
					'https://cdn.sanity.io/images/wf3kvo5h/production/64e80a541934ca7ab492cbd848f61e4799ade86f-1080x1350.jpg',
				source: 'https://wkshps.com/work/small-world',
				note: 'Blunt display type compresses a crowded image collage into a controlled, interconnected editorial surface.'
			}
		]
	},
	{
		slug: 'downtown-cool-no-covers',
		label: 'Downtown cool, no covers',
		prompt:
			'The Strokes-adjacent mix of flash-lit New York grit, blunt punk ephemera, severe modernist type, and hard geometric color, without using their album art.',
		references: [
			{
				title: 'Dead Kennedys at Bond International Casino, 1981',
				creator: 'Unknown designer / Wikimedia Commons',
				image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/DKbonds1982.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:DKbonds1982.jpg',
				note: 'Green currency imagery, rough halftones, and a crowded type stack turn cheap reproduction into downtown menace.'
			},
			{
				title: 'Big Black, Urge Overkill & Squirrel Bait flyer, 1985',
				creator: 'Steve Albini',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/6/6d/Big_Black%2C_Urge_Overkill%2C_%26_Squirrel_Bait_at_the_Jockey_Club_%281985-05-26_concert_flyer%29.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Big_Black,_Urge_Overkill,_%26_Squirrel_Bait_at_the_Jockey_Club_(1985-05-26_concert_flyer).jpg',
				note: 'Spray-painted lettering and black splatter on yellow stock make one abrasive gesture carry the whole flyer.'
			},
			{
				title: 'Punk and post-punk fanzines, 1970s',
				creator: 'Various designers / Jake',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/1/18/1970s_fanzines_%2821224199545%29.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:1970s_fanzines_(21224199545).jpg',
				note: 'Photocopied faces, improvised mastheads, and uneven black density show how repetition can become a visual language.'
			},
			{
				title: 'Tedje en de Flikkers / The Spoilers poster, 1980',
				creator: 'Doornroosje',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/7/78/Poster_Tedje_en_de_Flikkers_The_spoilers.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Poster_Tedje_en_de_Flikkers_The_spoilers.jpg',
				note: 'Loose drawing, cramped information, and a dirty two-tone print keep the event details visibly handmade.'
			},
			{
				title: 'Der ganz faire Prozess des Marcel G., 1976',
				creator: 'Unknown designer / Yanker Poster Collection, Library of Congress',
				image: 'https://tile.loc.gov/storage-services/service/pnp/yan/1a36000/1a36700/1a36785r.jpg',
				source: 'https://www.loc.gov/item/2016652587/',
				note: 'Grainy documentary frames, a near-black field, and condensed white type give a film poster the urgency of a club handbill.'
			},
			{
				title: 'A Ride on the 6, 1983',
				creator: 'Alfred Gonzalez',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/8/89/Alfred_Gonzalez_%22A_Ride_on_the_6%22.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:Alfred_Gonzalez_%22A_Ride_on_the_6%22.jpg',
				note: 'Available light, scratched surfaces, and a deep diagonal turn a subway interior into a ready-made black-and-white composition.'
			},
			{
				title: 'Dondi subway panel, 1984',
				creator: 'Dondi / Wikimedia Commons',
				image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Bus129_dondi_ny_1984.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:Bus129_dondi_ny_1984.jpg',
				note: 'A dense letter piece runs across the rigid metal grid, making the train itself behave like a long print surface.'
			},
			{
				title: 'Musica Viva concert poster, 1957',
				creator: 'Josef Muller-Brockmann',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/4/41/Josef_M%C3%BCller-Brockmann_1957.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:Josef_M%C3%BCller-Brockmann_1957.jpg',
				note: 'Offset orange blocks and spare lowercase type make strict geometry feel syncopated rather than corporate.'
			},
			{
				title: 'Rothko / Chillida, Kunsthalle Basel, 1962',
				creator: 'Armin Hofmann',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/a/ae/1962_-_Kunsthalle_Basel_-_Rothko_Chillida.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:1962_-_Kunsthalle_Basel_-_Rothko_Chillida.jpg',
				note: 'Huge black letters and one saturated red rectangle create brooding impact from almost no material.'
			},
			{
				title: 'Gubler / Zurkinden, Kunsthalle Basel, 1959',
				creator: 'Armin Hofmann',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kunsthalle_Basel_Gubler_Zurkinden_1959.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Kunsthalle_Basel_Gubler_Zurkinden_1959.jpg',
				note: 'A cool blue field and deliberately fractured line breaks make orderly sans serif type feel aloof and unstable.'
			},
			{
				title: 'Vanity Fair advertising poster, 1930',
				creator: 'Fortunato Depero',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/2/2c/Poster_advertising_the_American_magazine_Vanity_Fair.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Poster_advertising_the_American_magazine_Vanity_Fair.jpg',
				note: 'A mechanical figure, steep angles, and flat commercial color make sophistication feel strange instead of polished.'
			},
			{
				title: 'Composition, 1917',
				creator: 'Lyubov Popova / Berardo Collection',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/b/b5/Composition_%281917%29_-_Liubova_Popova_%281889-1924%29_%2845056449312%29.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Composition_(1917)_-_Liubova_Popova_(1889-1924)_(45056449312).jpg',
				note: 'Overlapping angular planes hold together through one concentrated red accent and a rough, visibly worked surface.'
			},
			{
				title: 'Poster design for The Little Review, 1925',
				creator: 'Theo van Doesburg / Kroller-Muller Museum',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/5/5e/Theo_van_Doesburg_design_poster_The_Little_Review_Gallery.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Theo_van_Doesburg_design_poster_The_Little_Review_Gallery.jpg',
				note: 'Block letters are rotated into architecture, balancing severe construction with the informality of a working sketch.'
			},
			{
				title: 'Runner in the City, c. 1926',
				creator: 'El Lissitzky / The Met',
				image:
					'https://collectionapi.metmuseum.org/api/collection/v1/iiif/265543/608608/restricted',
				source: 'https://www.metmuseum.org/art/collection/search/265543',
				note: 'A moving figure broken across narrow vertical bands turns a regular grid into speed, interference, and mechanical rhythm.'
			},
			{
				title: 'Asphalting a Street in Moscow, 1929',
				creator: 'Alexander Rodchenko / The Met',
				image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/283286/607158/thumbnail',
				source: 'https://www.metmuseum.org/art/collection/search/283286',
				note: 'A rotated horizon and abrupt machinery crop give ordinary street work the force of an abstract industrial layout.'
			},
			{
				title: 'Dobrolet stationery, 1923',
				creator: 'Alexander Rodchenko / The Met',
				image:
					'https://collectionapi.metmuseum.org/api/collection/v1/iiif/816045/1867784/thumbnail',
				source: 'https://www.metmuseum.org/art/collection/search/816045',
				note: 'A tiny red-and-black identity sits in an unusually empty cream field, using extreme scale contrast instead of decoration.'
			},
			{
				title: 'Cross Out Slums, c. 1938',
				creator: 'Lester Beall / National Archives',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/5/55/%22Cross_Out_Slums%22_-_NARA_-_513549.jpg',
				source: 'https://commons.wikimedia.org/wiki/File:%22Cross_Out_Slums%22_-_NARA_-_513549.jpg',
				note: 'A giant red X brutally edits gritty tenement photography, turning a basic mark into both message and composition.'
			},
			{
				title: 'Light, Rural Electrification Administration, c. 1937',
				creator: 'Lester Beall / Library of Congress',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/0/03/Light_-_Rural_electrification_administration_-_Beall._LCCN2010646236.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Light_-_Rural_electrification_administration_-_Beall._LCCN2010646236.jpg',
				note: 'A huge foreground bulb confronts a tiny house across red and blue blocks, making scale itself feel surreal.'
			},
			{
				title: 'America Calling, 1941',
				creator: 'Herbert Matter, Arthur H. Fisher / Chicago History Museum',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/b/b0/America_Calling_-_Take_Your_Place_in_Civilian_Defense_-_DPLA_-_bc5786c8cbc5479d090dde9bcd087a51.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:America_Calling_-_Take_Your_Place_in_Civilian_Defense_-_DPLA_-_bc5786c8cbc5479d090dde9bcd087a51.jpg',
				note: 'A close-cropped eagle is made cinematic through severe photomontage, flag color, and forceful sans serif type.'
			},
			{
				title: 'Arithmetic of a Counter-Plan, 1931',
				creator: 'Yakov Guminer',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/d/d9/Yakov_Guminer_-_Arithmetic_of_a_counter-plan_poster_%281931%29.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Yakov_Guminer_-_Arithmetic_of_a_counter-plan_poster_(1931).jpg',
				note: 'Oversized numerals, an equation, and rigid red geometry give dry information the presence of a loud headline.'
			},
			{
				title: 'Running Figure matchbox label, c. 1920s',
				creator: 'Unknown commercial designer / MatchboxPosters',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/7/71/Matchbox_label_-_Running_Figure_-_Russia_%28circa_1920s%29_-_MBP1187035909.jpg',
				source:
					'https://commons.wikimedia.org/wiki/File:Matchbox_label_-_Running_Figure_-_Russia_(circa_1920s)_-_MBP1187035909.jpg',
				note: 'A red silhouette, clock, and converging rails compress speed and transit into the tiny proportions of package graphics.'
			}
		]
	}
];
