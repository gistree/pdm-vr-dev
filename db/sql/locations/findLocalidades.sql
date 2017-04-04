-- Get All Localidades (id, geometria, nome)
SELECT gid, st_asgeojson(geom)::json AS geom, nome FROM cartografia.localidades ORDER BY nome;