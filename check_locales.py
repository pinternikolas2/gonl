import json
import os

def check_locales(directory):
    files = ['cz.json', 'en.json', 'sk.json']
    # Use absolute path for the directory
    full_path = 'c:/Users/acer/Desktop/GoNL/src/locales'
    contents = {}
    
    for f in files:
        path = os.path.join(full_path, f)
        if not os.path.exists(path):
            print(f"Error: {path} not found")
            continue
        with open(path, 'r', encoding='utf-8') as file:
            contents[f] = json.load(file)
            
    def get_keys(d, prefix=''):
        keys = set()
        if not isinstance(d, dict):
            return keys
        for k, v in d.items():
            full_key = f"{prefix}.{k}" if prefix else k
            keys.add(full_key)
            if isinstance(v, dict):
                keys.update(get_keys(v, full_key))
        return keys

    all_keys = {}
    for f, content in contents.items():
        all_keys[f] = get_keys(content)
        
    all_known_keys = set().union(*all_keys.values())
    
    for f, keys in all_keys.items():
        missing = all_known_keys - keys
        print(f"File: {f}")
        if not missing:
            print("  - ALL KEYS PRESENT")
        else:
            print(f"  Missing: {sorted(list(missing))}")
        print("-" * 20)

if __name__ == "__main__":
    check_locales('')
