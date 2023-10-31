{
  description = "A little leptos app to track your trash";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";

    treefmt-nix.url = "github:numtide/treefmt-nix";

    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
    fenix,
    crane,
    treefmt-nix,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      debug = true;
      systems = ["x86_64-linux" "aarch64-linux"];
      imports = [
        inputs.treefmt-nix.flakeModule
      ];

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        lib,
        ...
      }: let
        #fenixToolchain = fenix.packages.${system}.fromToolchainFile {
        #  file = ./rust-toolchain.toml;
        #  sha256 = "sha256-rLP8+fTxnPHoR96ZJiCa/5Ans1OojI7MLsmSqR2ip8o=";
        #};
        fenixToolchain = fenix.packages.${system}.stable;

        craneLib =
          crane.lib.${system}.overrideToolchain fenixToolchain.minimalToolchain;

        workspace = let
          mkMember = {
            name,
            profile ? builtins.null,
          }: let
            CARGO_PROFILE =
              if builtins.isNull profile
              then "release"
              else "${profile}";
            cargoArtifacts = craneLib.buildDepsOnly {
              inherit CARGO_PROFILE;
              pname =
                if builtins.isNull profile
                then "pomolib-release"
                else "pomolib-${profile}";
              src = ./.;
            };
          in {
            inherit name cargoArtifacts CARGO_PROFILE;
            pname =
              if builtins.isNull profile
              then "${name}"
              else "${name}-${profile}";
          };
        in [
          (mkMember {name = "frontend";})
          (mkMember {
            name = "frontend";
            profile = "dev";
          })

          (mkMember {name = "logic";})
          (mkMember {
            name = "logic";
            profile = "dev";
          })
        ];
      in {
        devShells.default = pkgs.mkShell {
          shellHook = ''
            export RUST_BACKTRACE=1
            export CARGO_INSTALL_ROOT=${toString ./.}/.cargo
          '';

          nativeBuildInputs = with pkgs; [
            # Nix
            alejandra
            nil

            # Rust
            (fenixToolchain.withComponents [
              "rustc"
              "cargo"
              "rust-analyzer"
              "rustfmt"
              "clippy"
            ])
          ];
        };

        treefmt.config = {
          projectRootFile = "flake.nix";
          programs = {
            prettier.enable = true;
            alejandra.enable = true;
            rustfmt = {
              enable = true;
              package = fenixToolchain.rustfmt;
            };
            leptosfmt.enable = true;
          };
        };

        packages = builtins.listToAttrs (
          map (
            {
              pname,
              name,
              cargoArtifacts,
              CARGO_PROFILE,
              ...
            }:
              lib.nameValuePair pname (craneLib.buildPackage {
                inherit pname cargoArtifacts CARGO_PROFILE;
                src = ./.;
                version = (builtins.fromTOML (builtins.readFile ./Cargo.toml)).workspace.package.version;
                cargoExtraArgs = "-p ${name}";
              })
          )
          workspace
        );

        apps = builtins.listToAttrs (
          map (
            {
              pname,
              name,
              ...
            }:
              lib.nameValuePair pname {
                type = "app";
                program = "${self.packages.${system}.${pname}}/bin/${name}";
              }
          )
          workspace
        );
      };
    };
}
