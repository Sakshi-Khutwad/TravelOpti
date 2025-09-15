import json
import time
import pandas as pd
from create_matrices import fetch_lat_long, get_distance_duration_matrix
from algorithms import brute_force_tsp

global cities

with open('dummy.json') as f:
    data = json.load(f)
    cities = data['cities']

source_city = data['start']
cities = {city: None for city in cities}

print("Fetching latitude and longitude of cities...")
for city in cities.keys():
    lat, long = fetch_lat_long(city)
    if lat is None or long is None:
        print(f"Could not fetch coordinates for {city}. Exiting.")
        exit(1)
    cities[city] = (lat, long)
    time.sleep(1)

distance_matrix, duration_matrix = get_distance_duration_matrix(cities)


brute_force = brute_force_tsp(distance_matrix, duration_matrix, cities, source_city)
print(brute_force)

# print("Fetching distance of cities...")

# city_names = list(cities.keys())
# distance_df = pd.DataFrame(distance_matrix, index=city_names, columns=city_names)
# duration_df = pd.DataFrame(duration_matrix, index=city_names, columns=city_names)

# pd.set_option("display.precision", 2)

# print("\nDistance Matrix (km):")
# print(distance_df)

# print("\nDuration Matrix (hours):")
# print(duration_df)

# print("\nCity coordinates:")
# # print(cities)
# cities_json = json.dumps(cities, indent=4, default=list)
# print(cities_json)
