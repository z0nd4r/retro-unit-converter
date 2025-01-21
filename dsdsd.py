from pint import UnitRegistry

ureg = UnitRegistry()

L = 11304.8 * ureg['cm']

print(L.to('km').magnitude)