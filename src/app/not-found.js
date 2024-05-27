import dynamic from 'next/dynamic';

const DynamicNotFound = dynamic(
	() => import('./component/notFound.tsx'),
	{ ssr: false }
);

export default function NotFound() {
	return <DynamicNotFound />;
}
