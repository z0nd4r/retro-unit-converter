from pint import UnitRegistry

ureg = UnitRegistry()

def Converter(request_type, target, data_int_float):
    if request_type == "length":
        lst_length = ['cm', 'km', 'm', 'mm', 'mile', 'yard', 'foot', 'inch']
        lst_length.remove(target)
        data_int_float = data_int_float * ureg['cm']
        lst = []
        for lh in lst_length:
            converted_value = data_int_float.to(lh)
            lst.append(f"{converted_value.magnitude:.2f} {converted_value.units}")
        print(lst)
        return ", ".join(lst)
    elif request_type == "mass":
        lst_weigth = ['kg', 'g', 'mg', 'ton', 'pound', 'ounce']
        lst_weigth.remove(target)
        data_int_float = data_int_float * ureg['cm']
        lst = []
        for wh in lst_weigth:
            converted_value = data_int_float.to(wh)
            lst.append(f"{converted_value.magnitude:.2f} {converted_value.units}")
        print(lst)
        return ", ".join(lst)
        
