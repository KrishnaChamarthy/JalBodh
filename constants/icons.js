import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export const icons = {
	map: (color, size) => <Ionicons name="map" color={color} size={size} />,
	stations: (color, size) => <MaterialCommunityIcons name="police-station" size={size} color={color} />,
	level: (color, size) => <MaterialIcons name="waves" color={color} size={size} />,
	analytics: (color, size) => <Ionicons name="stats-chart" color={color} size={size} />,
	profile: (color, size) => <MaterialIcons name="person" color={color} size={size} />,
	search: (color, size) => <Feather name="search" color={color} size={size} />,
	locate: (color, size) => <MaterialIcons name="my-location" color={color} size={size} />,
	shieldCheck: (color, size) => <MaterialCommunityIcons name="shield-check" color={color} size={size} />,
	water: (color, size) => <MaterialIcons name="water-drop" size={size} color={color} />,
	health: (color, size) => <MaterialIcons name="health-and-safety" size={size} color={color} />,
	filter: (color, size) => <Feather name="filter" color={color} size={size} />,
	sort: (color, size) => <MaterialIcons name="sort" color={color} size={size} />,
	chevronLeft: (color, size) => <Ionicons name="chevron-back" color={color} size={size} />,
	chevronRight: (color, size) => <Ionicons name="chevron-forward" color={color} size={size} />,
};
