import { GetStaticProps } from 'next';
import { Button, Heading, Select, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Card from '@/components/Card';

export interface StarshipProps {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	pilots: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

interface ResultsProps {
	count: number;
	next: string | null;
	previous: string | null;
	results: StarshipProps[];
}

interface FilmProps {
	title: string;
	starships: string[];
	url: string;
}

interface PageProps {
	starshipsData: ResultsProps;
	films: FilmProps[];
}

export default function Home({ starshipsData, films }: PageProps) {
	const [starships, setStarships] = useState<ResultsProps>(starshipsData);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentFilm, setCurrentFilm] = useState<string>('');

	async function switchPage(page: string | any) {
		setLoading(true);
		const res = await fetch(page).then((data) => {
			data.status === 200 && setLoading(false);
			return data.json();
		});

		const filteredStarships = !!currentFilm
			? res.results.filter((starship: StarshipProps) =>
					starship.films.find((film) => film === currentFilm)
			  )
			: res.results;

		setStarships({ ...res, results: filteredStarships });
	}

	function filterByFilm(e: { target: { value: string } }) {
		setCurrentFilm(e.target.value);

		const filteredStarships = !!e.target.value
			? starshipsData.results.filter((starship) =>
					starship.films.find((film) => film === e.target.value)
			  )
			: starshipsData.results;

		setStarships({ ...starships, results: filteredStarships });
	}

	return (
		<>
			<Heading p={10} textAlign='center'>
				STARSHIPS TO LET. GET YOURS RIGHT AWAY!
			</Heading>
			<Select
				placeholder='Filter by film'
				ml={10}
				maxW={300}
				value={currentFilm}
				onChange={filterByFilm}
			>
				{films.map((film) => (
					<option key={film.title} value={film.url}>
						{film.title}
					</option>
				))}
			</Select>
			<SimpleGrid columns={[1, 2, 3]} gap={6} p={10}>
				{starships.results.map((starship) => (
					<Card starship={starship} key={starship.name} />
				))}
			</SimpleGrid>
			<Stack
				direction='row'
				p={5}
				alignContent='center'
				justifyContent='center'
				spacing={4}
				align='center'
			>
				{starships.previous && (
					<Button
						isLoading={loading}
						colorScheme='teal'
						variant='outline'
						px={10}
						leftIcon={<ArrowBackIcon />}
						onClick={() => switchPage(starships.previous)}
					>
						Prev
					</Button>
				)}
				{starships.next && (
					<Button
						isLoading={loading}
						colorScheme='teal'
						variant='solid'
						px={10}
						rightIcon={<ArrowForwardIcon />}
						onClick={() => switchPage(starships.next)}
					>
						Next
					</Button>
				)}
			</Stack>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const starshipsData = await fetch(`${process.env.API_URL}`).then((res) =>
		res.json()
	);
	const filmsData = await fetch(`${process.env.API_URL_FILMS}`).then((res) =>
		res.json()
	);

	const films = filmsData.results.map((film: FilmProps) => {
		return {
			title: film.title,
			starships: film.starships,
			url: film.url,
		};
	});

	return { props: { starshipsData, films } };
};
