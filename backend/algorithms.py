import itertools

def brute_force_tsp(distance_matrix, duration_matrix, cities, source_city):

    algo_name = "brute force"

    city_names = list(cities.keys())
    source_index = city_names.index(source_city)

    other_cities = [i for i in range(len(city_names)) if i != source_index]

    permutations = list(itertools.permutations(other_cities))

    best_path_by_distance = None
    best_path_by_duration = None
    min_distance = float('inf')
    min_duration = float('inf')

    for permutation in permutations:
        path_indices = [source_index] + list(permutation) + [source_index]

        total_duration = 0
        total_distance = 0

        for i in range(len(path_indices) - 1):

            from_city = path_indices[i]
            to_city = path_indices[i+1]

            total_distance += distance_matrix[from_city][to_city]
            total_duration += duration_matrix[from_city][to_city]

        if total_distance < min_distance:
            min_distance = total_distance
            best_path_by_distance = path_indices

        if total_duration < min_duration:
            min_duration = total_duration
            best_path_by_duration = path_indices

    def indices_to_names(path_indices):
        return [city_names[i] for i in path_indices]
    
    path_distance_names = indices_to_names(best_path_by_distance)
    path_duration_names = indices_to_names(best_path_by_duration)

    min_distance = float(min_distance)
    min_duration = float(min_duration)

    return {
        "algorithm": algo_name,
        "best_path_by_distance": {
            "path": path_distance_names,
            "distance": round(min_distance, 2)
        },
        "best_path_by_time": {
            "path": path_duration_names,
            "time": round(min_duration, 2)
        },
    }

