import { StarshipProps } from '@/pages';
import {
	Card as ChakraCard,
	Box,
	CardBody,
	CardHeader,
	Heading,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface CardProps {
	starship: StarshipProps;
}

const Card = ({ starship }: CardProps) => {
	function generateStarshipUrl(url: string) {
		const url_arr = url.split('/');

		return `/starship/${url_arr[5]}`;
	}

	return (
		<Link href={generateStarshipUrl(starship.url)}>
			<ChakraCard
				_hover={{
					background: 'gray.100',
					transition: '0.2s ease',
				}}
				background='gray.50'
				minH={336}
			>
				<CardHeader>
					<Heading size='md'>{starship.name.toUpperCase()}</Heading>
				</CardHeader>

				<CardBody>
					<Stack divider={<StackDivider />} spacing='4'>
						<Box>
							<Heading size='xs' textTransform='uppercase'>
								Model
							</Heading>
							<Text pt='2' fontSize='sm'>
								{starship.model}
							</Text>
						</Box>
						<Box>
							<Heading size='xs' textTransform='uppercase'>
								Class
							</Heading>
							<Text pt='2' fontSize='sm'>
								{starship.starship_class}
							</Text>
						</Box>
						<Box>
							<Heading size='xs' textTransform='uppercase'>
								Cost
							</Heading>
							<Text pt='2' fontSize='sm'>
								{starship.cost_in_credits !== 'unknown'
									? `${starship.cost_in_credits} Credits`
									: starship.cost_in_credits}
							</Text>
						</Box>
					</Stack>
				</CardBody>
			</ChakraCard>
		</Link>
	);
};

export default Card;
