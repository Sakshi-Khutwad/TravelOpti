import itertools
import math

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

def greedy_tsp(distance_matrix, duration_matrix, cities, source_city):
    algo_name = "greedy"
    
    city_names = list(cities.keys())
    source_index = city_names.index(source_city)
    
    def solve_with_matrix(matrix, start_idx):
        n = len(matrix)
        visited = [False] * n
        path_indices = [start_idx]
        visited[start_idx] = True
        total_cost = 0
        
        current = start_idx
        for _ in range(n - 1):
            min_cost = float('inf')
            next_city = -1
            
            for neighbor in range(n):
                if not visited[neighbor] and matrix[current][neighbor] < min_cost:
                    min_cost = matrix[current][neighbor]
                    next_city = neighbor
            
            if next_city == -1:
                break
                
            path_indices.append(next_city)
            visited[next_city] = True
            total_cost += min_cost
            current = next_city
        
        total_cost += matrix[current][start_idx]
        path_indices.append(start_idx)
        
        return path_indices, total_cost
    
    path_distance_indices, min_distance = solve_with_matrix(distance_matrix, source_index)
    
    total_time_for_distance_path = 0
    for i in range(len(path_distance_indices) - 1):
        from_city = path_distance_indices[i]
        to_city = path_distance_indices[i+1]
        total_time_for_distance_path += duration_matrix[from_city][to_city]
    
    path_duration_indices, min_duration = solve_with_matrix(duration_matrix, source_index)
    
    total_distance_for_time_path = 0
    for i in range(len(path_duration_indices) - 1):
        from_city = path_duration_indices[i]
        to_city = path_duration_indices[i+1]
        total_distance_for_time_path += distance_matrix[from_city][to_city]
    
    def indices_to_names(path_indices):
        return [city_names[i] for i in path_indices]
    
    path_distance_names = indices_to_names(path_distance_indices)
    path_duration_names = indices_to_names(path_duration_indices)
    
    min_distance = float(min_distance)
    min_duration = float(min_duration)
    total_time_for_distance_path = float(total_time_for_distance_path)
    total_distance_for_time_path = float(total_distance_for_time_path)
    
    return {
        "algorithm": algo_name,
        "best_path_by_distance": {
            "path": path_distance_names,
            "distance": round(min_distance, 2),
            "time": round(total_time_for_distance_path, 2)
        },
        "best_path_by_time": {
            "path": path_duration_names,
            "distance": round(total_distance_for_time_path, 2),
            "time": round(min_duration, 2)
        }
    }

def dp_tsp(distance_matrix, duration_matrix, cities, source_city):
    algo_name = "dynamic programming"

    city_names = list(cities.keys())
    n = len(city_names)
    source_index = city_names.index(source_city)

    def solve(matrix):
        n = len(matrix)
        dp = [[math.inf] * n for _ in range(1 << n)]
        parent = [[-1] * n for _ in range(1 << n)]

        dp[1 << source_index][source_index] = 0

        for mask in range(1 << n):
            for u in range(n):
                if not (mask & (1 << u)):
                    continue
                for v in range(n):
                    if mask & (1 << v):
                        continue
                    new_mask = mask | (1 << v)
                    new_cost = dp[mask][u] + matrix[u][v]
                    if new_cost < dp[new_mask][v]:
                        dp[new_mask][v] = new_cost
                        parent[new_mask][v] = u

        full_mask = (1 << n) - 1
        best_cost = math.inf
        last_city = -1

        for i in range(n):
            if i == source_index:
                continue
            cost = dp[full_mask][i] + matrix[i][source_index]
            if cost < best_cost:
                best_cost = cost
                last_city = i

        # Reconstruct path
        path = []
        mask = full_mask
        curr = last_city
        while curr != -1:
            path.append(curr)
            next_city = parent[mask][curr]
            mask = mask ^ (1 << curr)
            curr = next_city
        path.append(source_index)
        path.reverse()
        path.append(source_index)

        return best_cost, path

    # Solve for distance and duration separately
    min_distance, path_distance = solve(distance_matrix)
    min_duration, path_duration = solve(duration_matrix)

    def indices_to_names(path_indices):
        return [city_names[i] for i in path_indices]

    return {
        "algorithm": algo_name,
        "best_path_by_distance": {
            "path": indices_to_names(path_distance),
            "distance": round(min_distance, 2)
        },
        "best_path_by_time": {
            "path": indices_to_names(path_duration),
            "time": round(min_duration, 2)
        },
    }
