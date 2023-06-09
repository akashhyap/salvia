import {NextSeo} from 'next-seo';
import PropTypes from 'prop-types';

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */

// @ts-ignore
const Seo = ( {seo, uri} ) => {
	// console.log("seo", seo);
	
	const {
		title,
		metaDesc,
		metaRobotsNoindex,
		metaRobotsNofollow,
		opengraphDescription,
		description,
		opengraphTitle,
		opengraphImage,
		opengraphSiteName,
	} = seo;

	const currentLocation = (typeof window !== 'undefined') ? window.location.origin : null;
	const opengraphUrl = ( process.env.NEXT_PUBLIC_NEXTJS_SITE_URL ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL : currentLocation ) + uri;

	return (
		<NextSeo
			title={title}
			description={opengraphDescription || metaDesc || description}
			canonical={opengraphUrl}
			noindex={metaRobotsNoindex}
			nofollow={metaRobotsNofollow}
			openGraph={{
				type: 'website',
				locale: 'en_US',
				url: opengraphUrl,
				title: opengraphTitle,
				description: opengraphDescription,
				images: [
					{
						url: opengraphImage?.sourceUrl,
						width: 1280,
						height: 720
					}
				],
				/* eslint-disable */
				site_name: opengraphSiteName
				/* eslint-enable */
			}}
			twitter={{
				handle: '',
				site: '',
				cardType: 'summary_large_image'
			}}
		/>
	);
};

Seo.propTypes = {
	seo: PropTypes.object
};

Seo.defaultProps = {
	seo: {
		canonical: '',
		title: '',
		metaDesc: '',
		metaRobotsNoindex: '',
		metaRobotsNofollow: '',
		opengraphDescription: '',
		opengraphTitle: '',
		opengraphImage: {
			sourceUrl: ''
		},
		opengraphUrl: '',
		opengraphSiteName: ''
	}
};

export default Seo;