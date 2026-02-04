import struct

with open('valentine_cat.gif', 'rb') as f:
    header = f.read(10)
    w, h = struct.unpack('<HH', header[6:10])
    print(f"{w}x{h}")
