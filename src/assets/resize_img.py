import time

start_time = time.time()
from PIL import Image,ImageOps


img = './heart.png'
output = './heart_resized.png'

def create_thumbnail(input_path, output_path, ratio = 1):
    with Image.open(input_path) as img:
        o_w, o_h = img.size
        new_size = (int(o_w*ratio), int(o_h*ratio))
        print(f"Size : {img.size} -> {new_size}")
        resized_img = img.resize(new_size, Image.LANCZOS)
        resized_img.save(output_path)


create_thumbnail(img, output,ratio=0.8)

end_time = time.time()

print(f"Spend Time : {end_time - start_time:.3}")
