# import json
import time
import requests
import numpy as np
# import pandas as pd

lat_long_endpoint = "https://nominatim.openstreetmap.org/search"
distance_durations_endpoint = "https://router.project-osrm.org/route/v1/driving/"

def fetch_lat_long(city):
    # https://nominatim.openstreetmap.org/search?q=Pune&format=json&limit=1

    response = requests.get(
        lat_long_endpoint, 
        params={
            'q': city,
            'format': 'json',
            'limit': 1
        },
        headers={
            "User-Agent": "city-geocoder/1.0 (sakshikhutwad09@gmail.com)"
        }
    )

    if response.status_code == 200:
        data = response.json()
        if data:
            lat = float(data[0].get("lat"))
            lon = float(data[0].get("lon"))
            print(f"{city}: {lat}, {lon}")
            return lat, lon
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
    return None, None

def fetch_distance_duration(source_city_lat_long, dest_city_lat_long):
    
    # https://router.project-osrm.org/route/v1/driving/77.5946,12.9716;72.8777,19.0760?overview=false
    
    # print(f"Fetching distance from {source_city_lat_long} to {dest_city_lat_long}")
    
    response = requests.get(
        distance_durations_endpoint + f"{source_city_lat_long[1]},{source_city_lat_long[0]};{dest_city_lat_long[1]},{dest_city_lat_long[0]}",
        params={
            'overview': 'false'
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        if data and 'routes' in data and data['routes']:
            distance = data['routes'][0].get('distance')
            duration = data['routes'][0].get('duration')
            # print(f"Distance: {distance} meters, Duration: {duration} seconds")
            return distance/1000, duration/3600
        else:
            print(f"No routes found distance/duration for {source_city_lat_long} to {dest_city_lat_long}")
            return None, None
    else:   
        print(f"Error: {response.status_code}")
        print(response.text)
        return None, None

def get_distance_duration_matrix(cities):

    distance_matrix = np.zeros((len(cities), len(cities)))
    duration_matrix = np.zeros((len(cities), len(cities)))

    for i, src in enumerate(cities):
        for j, dst in enumerate(cities):
            if i == j:
                distance_matrix[i][j] = 0
                duration_matrix[i][j] = 0
            else:
                dist, dur = fetch_distance_duration(cities[src], cities[dst])
                distance_matrix[i][j] = dist if dist is not None else np.nan
                duration_matrix[i][j] = dur if dur is not None else np.nan
                time.sleep(1)

    return distance_matrix, duration_matrix


# print("Fetching distance of cities...")

# distance_m, duration_m = get_distance_duration_matrix(cities)

# city_names = list(cities.keys())
# distance_df = pd.DataFrame(distance_m, index=city_names, columns=city_names)
# duration_df = pd.DataFrame(duration_m, index=city_names, columns=city_names)

# pd.set_option("display.precision", 2)

# print("\nDistance Matrix (km):")
# print(distance_df)

# print("\nDuration Matrix (hours):")
# print(duration_df)

# print("\nCity coordinates:")
# # print(cities)
# cities_json = json.dumps(cities, indent=4, default=list)
# print(cities_json)