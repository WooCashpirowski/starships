import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Container,
	Divider,
	Heading,
	List,
	ListIcon,
	ListItem,
	Stack,
	Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { StarshipProps } from '..';

interface PageProps {
	starship: StarshipProps;
}

const Starship = ({ starship }: PageProps) => {
	return (
		<Container py={10}>
			<Link href='/'>
				<Button
					colorScheme='teal'
					variant='outline'
					px={5}
					mb={5}
					leftIcon={<ArrowBackIcon />}
				>
					Go Back
				</Button>
			</Link>
			<Card maxW='lg' background='gray.50'>
				<CardBody>
					<Stack mt='6' spacing='3'>
						<Heading size='lg'>
							{starship.name.toUpperCase()}
						</Heading>
						<Divider />
						<List spacing={3}>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Model: <b>{starship.model}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Manufacturer: <b>{starship.manufacturer}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								MGLT: <b>{starship.MGLT}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Cargo capacity: <b>{starship.cargo_capacity}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Crew: <b>{starship.crew}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Passengers: <b>{starship.passengers}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Length: <b>{starship.length}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Hyperdrive rating:{' '}
								<b>{starship.hyperdrive_rating}</b>
							</ListItem>
							<ListItem>
								<ListIcon as={StarIcon} color='green.500' />
								Consumables: <b>{starship.consumables}</b>
							</ListItem>
						</List>
						<Text color='blue.600' fontSize='2xl'>
							Price:{' '}
							{starship.cost_in_credits !== 'unknown'
								? `${starship.cost_in_credits} Credits`
								: `TBA`}
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</Container>
	);
};

export default Starship;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await fetch(
		`${process.env.API_URL}/${context.params?.starship}`
	);
	const starship = await res.json();

	return {
		props: { starship },
	};
};
